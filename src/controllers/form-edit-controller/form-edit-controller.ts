import dayjs from "dayjs";
import { loadRepeatByIndex } from "../../API/access-db";
import { FormDisplayActionWithPayload } from "../../context/form-display/form-display-state";
import { DetailsFormState, RepeatFormState } from "../../context/form-state/form-init-states";
import { FormStateContext, UpdateFormAction } from "../../context/form-state/form-state";
import { forms, FormTitle } from "../../general/forms";
import { TimeUnits } from "../../general/global.var";
import { FinalBasicFormsStateWithID, FuelFormFinalState, OtherFormFinalState,
  ServiceFormFinalState, SpareFormFinalState } from "../../HOC/with-validate-check/check-form";
import { isFuelFormFinalState, isOtherFormFinalState, isServiceFormFinalState,
  isSpareFormFinalState } from "../../HOC/with-validate-check/form-typeguards";

export default class FormEditController {
  static _instance: FormEditController;
  showForm: (formTitle: FormTitle) => void;
  updateFuelForm: UpdateFormAction;
  updateServiceForm: UpdateFormAction;
  updateSpareForm: UpdateFormAction;
  updateOtherForm: UpdateFormAction;
  updateRepeatForm: UpdateFormAction;
  updateDetailsForm: UpdateFormAction;

  constructor() {
    if (!FormEditController._instance) FormEditController._instance = this;

    this.updateFuelForm = () => {};
    this.updateServiceForm = () => {};
    this.updateSpareForm = () => {};
    this.updateOtherForm = () => {};
    this.updateRepeatForm = () => {};
    this.updateDetailsForm = () => {};
    this.showForm = () => {};

    return FormEditController._instance;
  }

  setFormsDataActions(formState: FormStateContext) {
    this.updateFuelForm = formState.updateFuelForm;
    this.updateServiceForm = formState.updateServiceForm;
    this.updateSpareForm = formState.updateSpareForm;
    this.updateOtherForm = formState.updateOtherForm;
    this.updateRepeatForm = formState.updateRepeatForm;
    this.updateDetailsForm = formState.updateDetailsForm;
  }

  setShowFormAction(showFormAction: FormDisplayActionWithPayload) {
    this.showForm = (formTitle: FormTitle) => {
      const form = forms.find((form) => form.title === formTitle);
      form && showFormAction(form);
    };
  }

  editForm(formData: FinalBasicFormsStateWithID) {
    switch (true) {
      case isFuelFormFinalState(formData):
        {
          const tmp: FuelFormFinalState = formData as FuelFormFinalState;
          this.updateFuelForm({
            id: formData.id,
            fuelDate: dayjs(tmp.fuelDate).format("YYYY-MM-DD"),
            fuelRun: String(tmp.fuelRun),
            fuelCost: String(tmp.fuelCost),
            fuelPrice: String(tmp.fuelPrice),
            fuelVolume: String(tmp.fuelVolume),
          });
          this.showForm(FormTitle.FUEL);
        }
        break;

      case isSpareFormFinalState(formData):
        {
          const tmp: SpareFormFinalState = formData as SpareFormFinalState;
          this.updateSpareForm({
            id: formData.id,
            spareDate: dayjs(tmp.spareDate).format("YYYY-MM-DD"),
            spareTitle: tmp.spareTitle,
            sparePrice: String(tmp.sparePrice),
          });
          this.showForm(FormTitle.SPARE);
        }
        break;

      case isOtherFormFinalState(formData):
        {
          const tmp: OtherFormFinalState = formData as OtherFormFinalState;
          this.updateOtherForm({
            id: formData.id,
            otherDate: dayjs(tmp.otherDate).format("YYYY-MM-DD"),
            otherTitle: tmp.otherTitle,
            otherPrice: String(tmp.otherPrice),
          });
          this.showForm(FormTitle.OTHER);
        }
        break;

      case isServiceFormFinalState(formData):
        {
          const tmp: ServiceFormFinalState = formData as ServiceFormFinalState;
          loadRepeatByIndex(formData.id).then((repeatRecord) => {
            const repeatFormState: RepeatFormState | null = repeatRecord ? {
              repeatId: repeatRecord.id,
              repeatingRun: String(repeatRecord.repeatingRun),
              repeatingTime: String(repeatRecord.repeatingTime),
              repeatByRun: repeatRecord.repeatByRun,
              repeatByTime: repeatRecord.repeatByTime,
              repeatTimeSlot: repeatRecord.repeatTimeSlot as TimeUnits,
            } : null;
            repeatFormState && this.updateRepeatForm(repeatFormState);

            this.updateServiceForm({
              id: formData.id,
              serviceDate: dayjs(tmp.serviceDate).format("YYYY-MM-DD"),
              serviceDescription: tmp.serviceDescription,
              serviceRun: String(tmp.serviceRun),
              serviceTotal: String(tmp.serviceTotal),
              serviceRepeat: !!repeatFormState,
              serviceTotalDetails: tmp.serviceTotalDetails as DetailsFormState,
              serviceRepeatDetails: repeatFormState || {} as RepeatFormState,
            });
            this.showForm(FormTitle.SERVICE);
          });
        }
        break;
    }
  }
}
