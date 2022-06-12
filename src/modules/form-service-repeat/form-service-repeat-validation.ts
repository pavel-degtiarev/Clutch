import { setStateFunction } from "../../HOC/with-validate-submit/with-validate-submit";
import { ServiceRepeatFormFields, ServiceRepeatFormState } from "./form-service-repeat";

export default function getValidateServiceRepeatForm(setState: setStateFunction<ServiceRepeatFormState>) {
	return function (target: ServiceRepeatFormFields, value: string) {
		console.log("ServiceRepeat form validation", target, value);
	};
}
