import { setStateFunction } from "../../HOC/with-validate-submit/with-validate-submit";
import { ServiceDetailsFormFields, ServiceDetailsFormState } from "./form-service-details";

export default function getValidateServiceDetailsForm(
  setState: setStateFunction<ServiceDetailsFormState>) {
  
  return function (target: ServiceDetailsFormFields, value: string) {
    
		const validations: FormValidations<ServiceDetailsFormFields> = {
			// repeatingRun: (value) => {
			// 	setState((prevState) => {
			// 		const newState = { ...prevState, repeatingRun: value };
			// 		return newState;
			// 	});
			// },
		};

		console.log("ServiceDetails form validation", target, value);

		const checkTarget = validations[target];
		checkTarget && checkTarget(value);
	};
}
