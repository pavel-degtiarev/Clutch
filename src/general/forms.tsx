import * as React from "react";

import { FormItem } from "../context/form-display/form-display-types";
import WithValidateAndCheck from "../HOC/with-validate-check/with-validate-check";

import FormFuel from "../modules/form-fuel/form-fuel";
import getValidateFuelForm from "../modules/form-fuel/form-fuel-validation";
import checkFuelForm from "../modules/form-fuel/form-fuel-final-check";

import FormOther from "../modules/form-other/form-other";
import checkOtherForm from "../modules/form-other/form-other-final-check";
import getValidateOtherForm from "../modules/form-other/form-other-validation";

import FormSpare from "../modules/form-spare/form-spare";
import getValidateSpareForm from "../modules/form-spare/form-spare-validation";
import checkSpareForm from "../modules/form-spare/form-spare-final-check";

import FormService from "../modules/form-service/form-service";
import getValidateServiceForm from "../modules/form-service/form-service-validation";
import checkServiceForm from "../modules/form-service/form-service-final-check";

import FormServiceRepeat from "../modules/form-service-repeat/form-service-repeat";
import checkServiceRepeatForm from "../modules/form-service-repeat/form-service-repeat-final-check";
import getValidateServiceRepeatForm from "../modules/form-service-repeat/form-service-repeat-validation";

import FormServiceDetails from "../modules/form-service-details/form-service-details";
import getValidateServiceDetailsForm from "../modules/form-service-details/form-service-details-validation";
import checkServiceDetailsForm from "../modules/form-service-details/form-service-details-final-check";

import { FuelFormFields, FuelFormState, OtherFormFields, OtherFormState, DetailsFormFields, DetailsFormState, ServiceFormFields, ServiceFormState, RepeatFormFields, RepeatFormState, SpareFormFields, SpareFormState } from "../context/form-state/form-init-states";


// ============================================

export enum FormTitle {
  FUEL = "Топливо",
  SPARE = "Расходники, запчасти",
  SERVICE = "Сервис",
  OTHER = "Прочее",
  REPEAT = "Периодичность",
  DETAILS = "Подробнее",
}


export const forms: FormItem[] = [
  {
    title: FormTitle.FUEL,
    form: (
      <WithValidateAndCheck<FuelFormFields, FuelFormState>
        Form={FormFuel}
        getValidate={getValidateFuelForm}
        finalCheck={checkFuelForm}
      />
    ),
  },
  {
    title: FormTitle.SPARE,
    form: (
      <WithValidateAndCheck<SpareFormFields, SpareFormState>
        Form={FormSpare}
        getValidate={getValidateSpareForm}
        finalCheck={checkSpareForm}
      />
    ),
  },
  {
    title: FormTitle.SERVICE,
    form: (
      <WithValidateAndCheck<ServiceFormFields, ServiceFormState>
        Form={FormService}
        getValidate={getValidateServiceForm}
        finalCheck={checkServiceForm}
      />
    ),
  },
  {
    title: FormTitle.OTHER,
    form: (
      <WithValidateAndCheck<OtherFormFields, OtherFormState>
        Form={FormOther}
        getValidate={getValidateOtherForm}
        finalCheck={checkOtherForm}
      />
    ),
  },
];

export const subforms = {
  repeatSubform: {
    title: FormTitle.REPEAT,
    form: (
      <WithValidateAndCheck<RepeatFormFields, RepeatFormState>
        Form={FormServiceRepeat}
        getValidate={getValidateServiceRepeatForm}
        finalCheck={checkServiceRepeatForm}
      />
    ),
  },
  detailsSubform: {
    title: FormTitle.DETAILS,
    form: (
      <WithValidateAndCheck<DetailsFormFields, DetailsFormState>
        Form={FormServiceDetails}
        getValidate={getValidateServiceDetailsForm}
        finalCheck={checkServiceDetailsForm}
      />
    ),
  },
};
