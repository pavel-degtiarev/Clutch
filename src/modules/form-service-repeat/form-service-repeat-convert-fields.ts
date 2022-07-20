import { RepeatFormState } from "../../context/form-state/form-init-states";
import { repeatFormFinalState } from "../../HOC/with-validate-submit/submit-form";

export function convertServiceRepeatFields(
	state: RepeatFormState): repeatFormFinalState {
	
	const finalState: repeatFormFinalState =
		state.repeatByRun || state.repeatByTime
			? {
					repeatByRun: state.repeatByRun,
					repeatingRun: Number(state.repeatingRun),
					repeatByTime: state.repeatByTime,
					repeatingTime: Number(state.repeatingTime),
					repeatTimeSlot: state.repeatTimeSlot,
			  }
			: null;

	return finalState;
}
