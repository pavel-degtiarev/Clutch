import { submitCheckpoint } from "../../utilities/submit-checkpoint";
import { OtherFormState } from "./form-other";

export const formOtherCheckpoints: Checkpoint<OtherFormState>[] = [
	function noEmptyFields(state: OtherFormState): boolean {
		return submitCheckpoint(
			() => !Object.values(state).includes(""),
			"Все поля должны быть заполнены!"
		);
	},
];
