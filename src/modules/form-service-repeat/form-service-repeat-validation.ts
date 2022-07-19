import { setStateFunction } from "../../HOC/with-validate-submit/with-validate-submit";
import { RepeatFormFields, RepeatFormState } from "../../context/form-state/form-init-states";

export default function getValidateServiceRepeatForm(
	setState: setStateFunction<RepeatFormState>
) {
	return function (target: RepeatFormFields, value: string) {
		const validations: FormValidations<RepeatFormFields> = {
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

		const checkTarget = validations[target];
		checkTarget && checkTarget(value);
	};
}
