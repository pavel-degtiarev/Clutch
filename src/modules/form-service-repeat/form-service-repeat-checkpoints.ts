import { ServiceRepeatFormState } from "../../context/form-state/form-init-states";
import { submitCheckpoint } from "../../utilities/submit-checkpoint";

export const formServiceRepeatCheckpoints: Checkpoint<ServiceRepeatFormState>[] = [

	function runFilled(state: ServiceRepeatFormState) {
		return submitCheckpoint(
			() => {
				if (!state.repeatByRun) return true;
				if (state.repeatingRun) return true;
				return false;
			},
			"Не указан пробег!"
		);
	},

	function timeFilled(state: ServiceRepeatFormState) {
		return submitCheckpoint(
			() => {
				if (!state.repeatByTime) return true;
				if (state.repeatingTime) return true;
				return false;
			},
			"Не указан период времени!"
		);
	},
];
