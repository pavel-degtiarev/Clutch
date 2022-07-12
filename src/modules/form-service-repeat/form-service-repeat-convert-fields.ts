import { ServiceRepeatFormFinalState } from "../../utilities/submit-form";
import { ServiceRepeatFormState } from "./form-service-repeat";

export function convertServiceRepeatFields(
	state: ServiceRepeatFormState): ServiceRepeatFormFinalState {
	
	const finalState: ServiceRepeatFormFinalState =
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
