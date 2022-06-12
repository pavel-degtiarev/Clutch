import { setStateFunction } from "../../HOC/with-validate-submit/with-validate-submit";
import { ServiceFormFields, ServiceFormState } from "./form-service";

export default function getValidateServiceForm(setState: setStateFunction<ServiceFormState>) {
	return function (target: ServiceFormFields, value: string) {
		console.log("Service form validation", target, value);
	};
}
