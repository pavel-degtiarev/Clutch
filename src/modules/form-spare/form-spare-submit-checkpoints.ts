import { SpareFormState } from "../../store/form-init-states";
import { submitCheckpoint } from "../../utilities/submit-checkpoint";

export const formSpareCheckpoints: Checkpoint<SpareFormState>[] = [
	function noEmptyFields(state: SpareFormState): boolean {
		return submitCheckpoint(
			() => !Object.values(state).includes(""),
			"Все поля должны быть заполнены!"
		);
	},
];
