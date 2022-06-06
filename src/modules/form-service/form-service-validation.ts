import { setStateFunction } from "../../HOC/with-validate-submit/with-validate-submit";
import { ServiceFormFields, ServiceFormState } from "./form-service";

export default function validateServiceForm(
	target: ServiceFormFields,
	value: string,
	setState: setStateFunction<ServiceFormState>
) {
	console.log("Service form validation");
}
