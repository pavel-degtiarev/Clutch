import { OtherFormState } from "../../context/form-state/form-init-states";
import { submitCheckpoint } from "../../utilities/submit-checkpoint";

export const formOtherCheckpoints: Checkpoint<OtherFormState>[] = [
	function noEmptyFields(state: OtherFormState): boolean {
		return submitCheckpoint(
			() => !Object.values(state).includes(""),
			"Все поля должны быть заполнены!"
		);
	},
];
