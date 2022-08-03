import dayjs from "dayjs";
import { DurationUnitType } from "dayjs/plugin/duration";
import { WritableDraft } from "immer/dist/internal";
import { getNewestRecord, loadAllFromDb, loadById } from "../../API/access-db";
import { dbStoreName } from "../../API/init-db";
import { TimeUnits } from "../../general/global.var";
import { FuelFormFinalState, RepeatFormFinalState, ServiceFormFinalState } from "../../HOC/with-validate-check/check-form";
import { Reminder, RunTrigger, Urgency } from "../../modules/reminder-item/reminder.types";
import { clearRepeatSlice, RepeatSliceData, setRepeatSlice } from "../../store/service-repeat-slice/service-repeat-slice";
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

  get reminders() {
    return this._reminders;
  }

  async init() {
    this.dispatch(clearRepeatSlice());
    const repeatData = await loadAllFromDb(dbStoreName.REPEAT);
    this.dispatch(setRepeatSlice(repeatData as RepeatFormFinalState[]));
    await this.setReminders();
  }

  async setReminders() {
    const repeatData = this._store.getState().repeat;
    if (!repeatData.length) {
      this._reminders = [];
      return;
    }

    this._reminders = await Promise.all(
      repeatData.map(async (repeat) => await createReminder(repeat))
    );

    // ================================

    async function createReminder(repeatRecord: RepeatSliceData) {
      const serviceRecord: ServiceFormFinalState = await loadById(
        dbStoreName.SERVICE, repeatRecord.serviceId);

      const reminder: Reminder = {
        serviceId: repeatRecord.serviceId,
        title: serviceRecord.serviceDescription,
        urgency: Urgency.NORMAL,
        trigger: {} as RunTrigger,
      };

      if (repeatRecord.repeatByRun) {
        const runToDue = await getRunToDue(serviceRecord, repeatRecord.repeatingRun);
        reminder.urgency = getUrgency(runToDue, 100, reminder.urgency);
        reminder.trigger = { ...reminder.trigger, run: runToDue <= 0 ? 0 : runToDue };
      }

      if (repeatRecord.repeatByTime) {
        const timeToDue = await getTimeToDue(serviceRecord, repeatRecord.repeatingTime,
          repeatRecord.repeatTimeSlot as TimeUnits);
        reminder.urgency = getUrgency(dayjs.duration(timeToDue).asDays(), 7, reminder.urgency);

        reminder.trigger = {
          ...reminder.trigger,
          time: {
            interval: Math.round(
              dayjs.duration(timeToDue).as(repeatRecord.repeatTimeSlot as DurationUnitType)
            ),
            unit: repeatRecord.repeatTimeSlot as TimeUnits,
          },
        };
      }
      return reminder;
    }

    function getUrgency(value: number, nearTreshold: number, currentUrgency: Urgency): Urgency {
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
        getNewestRecord(dbStoreName.SERVICE), getNewestRecord(dbStoreName.FUEL),
      ]);

      const actualRun = Math.max(
        (newestFuel as FuelFormFinalState).fuelRun || 0,
        (newestService as ServiceFormFinalState).serviceRun || 0
      );

      const runToDue = repeatingRun - (actualRun - initialRun);
      return runToDue;
    }
  }

  async editServiceWithReminder(reminder: Reminder) {
    const serviceRecord: ServiceFormFinalState = await loadById(
      dbStoreName.SERVICE, reminder.serviceId);
      console.log(serviceRecord);
    }
}
