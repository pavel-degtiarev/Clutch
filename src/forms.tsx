import * as React from "react";

import { FormItem } from "./components/popup-switch/popup-switch.types";
import WithValidateSubmit from "./HOC/with-validate-submit/with-validate-submit";

import FormFuel, { FuelFormFields, FuelFormState } from "./modules/form-fuel/form-fuel";
import getValidateFuelForm from "./modules/form-fuel/form-fuel-validation";
import submitFuelForm from "./modules/form-fuel/form-fuel-submit";

import FormOther, { OtherFormFields, OtherFormState } from "./modules/form-other/form-other";
import submitOtherForm from "./modules/form-other/form-other-submit";
import getValidateOtherForm from "./modules/form-other/form-other-validation";

import FormSpare, { SpareFormFields, SpareFormState } from "./modules/form-spare/form-spare";
import getValidateSpareForm from "./modules/form-spare/form-spare-validation";
import submitSpareForm from "./modules/form-spare/form-spare-submit";

import FormService, { ServiceFormFields, ServiceFormState } from "./modules/form-service/form-service";
import getValidateServiceForm from "./modules/form-service/form-service-validation";
import submitServiceForm from "./modules/form-service/form-service-submit";

import FormServiceRepeat, { ServiceRepeatFormFields, ServiceRepeatFormState
} from "./modules/form-service-repeat/form-service-repeat";
import submitServiceRepeatForm from "./modules/form-service-repeat/form-service-repeat-submit";
import getValidateServiceRepeatForm from "./modules/form-service-repeat/form-service-repeat-validation";

import FormServiceDetails, { ServiceDetailsFormFields, ServiceDetailsFormState }
	from "./modules/form-service-details/form-service-details";
import getValidateServiceDetailsForm from "./modules/form-service-details/form-service-details-validation";
import submitServiceDetailsForm from "./modules/form-service-details/form-service-details-submit";

// ============================================

export const forms: FormItem[] = [
	{
		title: "Топливо",
		form: (
			<WithValidateSubmit<FuelFormFields, FuelFormState>
				Form={FormFuel}
				getValidate={getValidateFuelForm}
				submit={submitFuelForm} />
		),
	},
	{
		title: "Расходники, запчасти",
		form: (
			<WithValidateSubmit<SpareFormFields, SpareFormState>
				Form={FormSpare}
				getValidate={getValidateSpareForm}
				submit={submitSpareForm} />
		),
	},
	{
		title: "Сервис",
		form: (
			<WithValidateSubmit<ServiceFormFields, ServiceFormState>
				Form={FormService}
				getValidate={getValidateServiceForm}
				submit={submitServiceForm} />
		),
	},
	{
		title: "Прочее",
		form: (
			<WithValidateSubmit<OtherFormFields, OtherFormState>
				Form={FormOther}
				getValidate={getValidateOtherForm}
				submit={submitOtherForm} />
		),
	},
];

export const subforms = {
	repeatSubform: {
		title: "Периодичность",
		form: (
			<WithValidateSubmit<ServiceRepeatFormFields, ServiceRepeatFormState>
				Form={FormServiceRepeat}
				getValidate={getValidateServiceRepeatForm}
				submit={submitServiceRepeatForm} />
		),
	},
	detailsSubform: {
		title: "Подробнее",
		form: (
			<WithValidateSubmit<ServiceDetailsFormFields, ServiceDetailsFormState>
				Form={FormServiceDetails}
				getValidate={getValidateServiceDetailsForm}
				submit={submitServiceDetailsForm} />
		),
	},
};
