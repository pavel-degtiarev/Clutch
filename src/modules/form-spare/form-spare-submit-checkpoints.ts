import { SpareFormState } from "../../context/form-state/form-init-states";
import { submitCheckpoint } from "../../HOC/with-validate-submit/submit-checkpoint";

export const formSpareCheckpoints: Checkpoint<SpareFormState>[] = [
	function noEmptyFields(state: SpareFormState): boolean {
		return submitCheckpoint(
			() => !Object.values(state).includes(""),
			"Все поля должны быть заполнены!"
		);
	},
];
