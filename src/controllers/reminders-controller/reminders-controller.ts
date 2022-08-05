import dayjs from "dayjs";
import { DurationUnitType } from "dayjs/plugin/duration";
import { getNewestRecord, loadAllFromDb, loadById } from "../../API/access-db";
import { dbStoreName } from "../../API/init-db";
import { FormDisplayActionWithPayload } from "../../context/form-display/form-display-state";
import { RepeatFormState } from "../../context/form-state/form-init-states";
import { UpdateFormAction } from "../../context/form-state/form-state";
import { forms, FormTitle } from "../../general/forms";
import { TimeUnits } from "../../general/global.var";
import { FuelFormFinalState, RepeatFormFinalState, ServiceFormFinalState,
  } from "../../HOC/with-validate-check/check-form";
import { TargetFormState } from "../../HOC/with-validate-check/with-validate-check";
import { isRunTrigger, isTimeTrigger, Reminder, RunTrigger, Urgency,
  } from "../../modules/reminder-item/reminder.types";
import { clearRepeatSlice, RepeatSliceData, setRepeatSlice,
  } from "../../store/service-repeat-slice/service-repeat-slice";
import { ClutchStoreDispatch, ClutchStoreType } from "../../store/store";

export class RemindersController {
  private static _instance: RemindersController;

  private _reminders: Reminder[];
  private _store: ClutchStoreType;
  storeDispatch: ClutchStoreDispatch;
  showServiceForm: (() => void) | undefined;
  updateServiceForm: UpdateFormAction | undefined;
  updateRepeatForm: UpdateFormAction | undefined;
  updateDetailsForm: UpdateFormAction | undefined;
  onUpdateCallback: OnUpdateCallback | null;

  constructor(store: ClutchStoreType) {
    if (!RemindersController._instance) {
      RemindersController._instance = this;
    }

    this._reminders = [];
    this.onUpdateCallback = null;
    this._store = store;
    this.storeDispatch = store.dispatch;

    return RemindersController._instance;
  }

  get reminders() { return this._reminders }

  async init() {
    this.storeDispatch(clearRepeatSlice());
    const repeatData = await loadAllFromDb(dbStoreName.REPEAT);
    this.storeDispatch(setRepeatSlice(repeatData as RepeatFormFinalState[]));
    await this.setReminders();
  }

  clearReminders() {
    this._reminders = [];
    this.onUpdateCallback && this.onUpdateCallback();
  }

  async setReminders() {
    this._reminders = [];
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
        id: repeatRecord.id,
        serviceId: repeatRecord.serviceId,
        title: serviceRecord.serviceDescription,
        urgency: Urgency.NORMAL,
        trigger: {} as RunTrigger,
        initConditions: {
          run: repeatRecord.repeatingRun,
          time: repeatRecord.repeatingTime,
          timeUnits: repeatRecord.repeatTimeSlot as TimeUnits,
        },
      };

      if (repeatRecord.repeatByRun) {
        const runToDue = await getRunToDue(serviceRecord, repeatRecord.repeatingRun);
        reminder.urgency = getUrgency(runToDue, 100, reminder.urgency);
        reminder.trigger = { ...reminder.trigger, run: Math.abs(runToDue) };
      }

      if (repeatRecord.repeatByTime) {
        const timeToDue = await getTimeToDue(serviceRecord, repeatRecord.repeatingTime,
          repeatRecord.repeatTimeSlot as TimeUnits);
        reminder.urgency = getUrgency(dayjs.duration(timeToDue).asDays(), 7, reminder.urgency);

        reminder.trigger = {
          ...reminder.trigger,
          time: {
            interval: Math.round(
              dayjs
                .duration(Math.abs(timeToDue))
                .as(repeatRecord.repeatTimeSlot as DurationUnitType)
            ),
            unit: repeatRecord.repeatTimeSlot as TimeUnits,
          },
        };
      }
      return reminder;
    }

    function getUrgency(value: number, nearTreshold: number, currentUrgency: Urgency): Urgency {
      if (value <= 0) return Urgency.OVERDUED;
      if (value <= nearTreshold && currentUrgency === Urgency.NORMAL) return Urgency.NEARDUE;
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

    this.onUpdateCallback && this.onUpdateCallback()
  }

  // ================================

  setShowFormAction(showFormAction: FormDisplayActionWithPayload) {
    const serviceForm = forms.find((form) => form.title === FormTitle.SERVICE);
    if (serviceForm) {
      this.showServiceForm = () => showFormAction(serviceForm);
    }
  }

  // ================================

  setFormsDataActions(
    updateServiceForm: UpdateFormAction,
    updateRepeatForm: UpdateFormAction,
    updateDetailsForm: UpdateFormAction
  ) {
    this.updateServiceForm = updateServiceForm;
    this.updateRepeatForm = updateRepeatForm;
    this.updateDetailsForm = updateDetailsForm;
  }

  // ================================

  async editServiceWithReminder(reminder: Reminder) {
    const serviceRecord: ServiceFormFinalState = await loadById(
      dbStoreName.SERVICE,
      reminder.serviceId
    );

    const repeatFormState: RepeatFormState = {
      repeatId: reminder.id,
      repeatingRun: isRunTrigger(reminder.trigger) ? `${reminder.initConditions.run}` : "",
      repeatingTime: isTimeTrigger(reminder.trigger) ? `${reminder.initConditions.time}` : "",
      repeatByRun: "run" in reminder.trigger,
      repeatByTime: "time" in reminder.trigger,
      repeatTimeSlot: reminder.initConditions.timeUnits,
    };

    const serviceFormState = {
      serviceDate: dayjs().format("YYYY-MM-DD"),
      serviceDescription: serviceRecord.serviceDescription,
      serviceRun: "",
      serviceTotal: "",
      serviceRepeat: true,
      serviceTotalDetails: serviceRecord.serviceTotalDetails,
      serviceRepeatDetails: repeatFormState,
    };

    this.updateServiceForm && this.updateServiceForm(serviceFormState as TargetFormState);
    this.updateRepeatForm && this.updateRepeatForm(repeatFormState as TargetFormState);
    this.showServiceForm && this.showServiceForm();
  }

  // ================================

  setOnUpdateCallback(callback: OnUpdateCallback) {
    this.onUpdateCallback = callback;
  }
}
