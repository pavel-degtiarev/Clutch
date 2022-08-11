import dayjs from "dayjs";
import { FormDisplayActionWithPayload } from "../../context/form-display/form-display-state";
import { FormStateContext, UpdateFormAction } from "../../context/form-state/form-state";
import { forms, FormTitle } from "../../general/forms";
import { FinalBasicFormsState, FuelFormFinalState } from "../../HOC/with-validate-check/check-form";
import { isFuelFormFinalState } from "../../HOC/with-validate-check/form-typeguards";

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
    this.showForm = () => { };
    
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

  editForm(formData: FinalBasicFormsState) {
    console.log(formData);

    switch (true) {
      case isFuelFormFinalState(formData):
        const tmp: FuelFormFinalState = formData as FuelFormFinalState;
        this.updateFuelForm({
          fuelDate: dayjs(tmp.fuelDate).format("YYYY-MM-DD"),
          fuelRun: String(tmp.fuelRun),
          fuelCost: String(tmp.fuelCost),
          fuelPrice: String(tmp.fuelPrice),
          fuelVolume: String(tmp.fuelVolume),
        });
        this.showForm(FormTitle.FUEL);
        break;
    }
  }
}
