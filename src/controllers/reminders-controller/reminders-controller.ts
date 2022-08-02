import dayjs from "dayjs";
import { DurationUnitType } from "dayjs/plugin/duration";
import { getNewestRecord, loadAllFromDb, loadById } from "../../API/access-db";
import { dbStoreName } from "../../API/init-db";
import { TimeUnits } from "../../general/global.var";
import { FuelFormFinalState, RepeatFormFinalState, ServiceFormFinalState } from "../../HOC/with-validate-check/check-form";
import reminders from "../../mocks/reminders";
import { Reminder, RunTrigger, Urgency } from "../../modules/reminder-item/reminder.types";
import { setRepeatSlice } from "../../store/service-repeat-slice/service-repeat-slice";
import { ClutchStoreDispatch, ClutchStoreType } from "../../store/store";

export class RemindersController {
  private static _instance: RemindersController;

  private _reminders: Reminder[];
  private _store: ClutchStoreType;
  dispatch: ClutchStoreDispatch;

  constructor(store: ClutchStoreType) {
    if (!RemindersController._instance) {
      RemindersController._instance = this;
    }

    this._store = store;
    this.dispatch = store.dispatch;
    this._reminders = [];

    return RemindersController._instance;
  }

  async init() {
    this._reminders = reminders;
    const qq = await loadAllFromDb(dbStoreName.REPEAT);
    this.dispatch(setRepeatSlice(qq as RepeatFormFinalState[]));
    await this.setReminders();
  }

  get reminders() {
    return this._reminders;
  }

  async setReminders() {
    const repeatData = this._store.getState().repeat;
    if (!repeatData.length) {
      this._reminders = [];
      return;
    }

    this._reminders = await Promise.all(
      repeatData.map(async (repeat) => {
        const serviceRecord: ServiceFormFinalState = await loadById(
          dbStoreName.SERVICE, repeat.serviceId);

        const reminder: Reminder = {
          title: serviceRecord.serviceDescription,
          urgency: Urgency.NORMAL,
          trigger: {} as RunTrigger,
        };

        if (repeat.repeatByRun) {
          const runToDue = await getRunToDue(serviceRecord, repeat.repeatingRun);
          reminder.urgency = getUrgency(runToDue, 100, reminder.urgency);
          reminder.trigger = { ...reminder.trigger, run: runToDue <= 0 ? 0 : runToDue };
        }

        if (repeat.repeatByTime) {
          const timeToDue = await getTimeToDue(
            serviceRecord, repeat.repeatingTime, repeat.repeatTimeSlot as TimeUnits);
          reminder.urgency = getUrgency(dayjs.duration(timeToDue).asDays(), 7, reminder.urgency);
            
          reminder.trigger = {
            ...reminder.trigger,
            time: {
              interval: Math.round(dayjs.duration(timeToDue).as(repeat.repeatTimeSlot as DurationUnitType)),
              unit: repeat.repeatTimeSlot as TimeUnits,
            },
          };
        }

        return reminder;
      })
    );    

    // ================================

    function getUrgency(value: number, nearTreshold: number, currentUrgency:Urgency): Urgency {
      if (value <= nearTreshold && currentUrgency === Urgency.NORMAL) return Urgency.NEARDUE;
      if (value <= 0) return Urgency.OVERDUED;
      return currentUrgency;
    }

    async function getTimeToDue(serviceRecord: ServiceFormFinalState,
      repeatingTime: number, repeatingUnit: TimeUnits) {
      const initialDate = serviceRecord.serviceDate;
      const actualDate = dayjs().valueOf();
      const time = dayjs
        .duration(repeatingTime, repeatingUnit as DurationUnitType)
        .asMilliseconds();
      const timeToDue = dayjs.duration(time - (actualDate - initialDate)).asMilliseconds();
      return timeToDue;
    }

    async function getRunToDue(serviceRecord: ServiceFormFinalState, repeatingRun: number) {
      const initialRun = serviceRecord.serviceRun;
      const [newestService, newestFuel] = await Promise.all([
        getNewestRecord(dbStoreName.SERVICE),
        getNewestRecord(dbStoreName.FUEL),
      ]);

      const actualRun = Math.max(
        (newestFuel as FuelFormFinalState).fuelRun || 0,
        (newestService as ServiceFormFinalState).serviceRun || 0
      );

      const runToDue = repeatingRun - (actualRun - initialRun);
      return runToDue;
    }
  }
}
