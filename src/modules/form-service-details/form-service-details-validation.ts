import { setStateFunction } from "../../HOC/with-validate-submit/with-validate-submit";
import { ServiceDetailsFormFields, ServiceDetailsFormState } from "./form-service-details";

export default function getValidateServiceDetailsForm(
  setState: setStateFunction<ServiceDetailsFormState>) {
  
  return function (target: ServiceDetailsFormFields, value: string) {

		console.log("ServiceDetails form validation", target, value);

		// форма содержит динамический список инпутов.
		// поэтому поля формы не соответствуют полям объекта состояния

		
	};
}
