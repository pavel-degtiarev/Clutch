import { setStateFunction } from "../../HOC/with-validate-submit/with-validate-submit";
import { ServiceRepeatFormFields, ServiceRepeatFormState } from "./form-service-repeat";

export default function getValidateServiceRepeatForm(
	setState: setStateFunction<ServiceRepeatFormState>
) {
	return function (target: ServiceRepeatFormFields, value: string) {
		const validations: FormValidations<ServiceRepeatFormFields> = {
			repeatingRun: (value) => {
				setState((prevState) => {
					const newState = { ...prevState, repeatingRun: value };
					return newState;
				});
			},

			repeatingTime: (value) => {
				setState((prevState) => {
					const newState = { ...prevState, repeatingTime: value };
					return newState;
				});
			},

			repeatByRun: (value) => {
				setState((prevState) => {
					const newState = { ...prevState, repeatByRun: value };
					if (!newState.repeatByTime) newState.repeatingRun = "";
					return newState;
				});
			},

			repeatByTime: (value) => {
				setState((prevState) => {
					const newState = { ...prevState, repeatByTime: value };
					if (!newState.repeatByTime) newState.repeatingTime = "";
					return newState;
				});
			},

			repeatTimeSlot: (value) => {
				setState((prevState) => {
					const newState = { ...prevState, repeatTimeSlot: value };
					return newState;
				});
			},
		};

		console.log("ServiceRepeat form validation", target, value);

		const checkTarget = validations[target];
		checkTarget && checkTarget(value);
	};
}
