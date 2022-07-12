import { submitCheckpoint } from "../../utilities/submit-checkpoint";
import { SpareFormState } from "./form-spare";

export const formSpareCheckpoints: Checkpoint<SpareFormState>[] = [
	function noEmptyFields(state: SpareFormState): boolean {
		return submitCheckpoint(
			() => !Object.values(state).includes(""),
			"Все поля должны быть заполнены!"
		);
	},
];
