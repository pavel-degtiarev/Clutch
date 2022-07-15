import { submitCheckpoint } from "../../utilities/submit-checkpoint";
import { ServiceFormState } from "./form-service";

export const formServiceCheckpoints: Checkpoint<ServiceFormState>[] = [
	function noEmptyFields(state: ServiceFormState): boolean {
		return submitCheckpoint(
			() => !Object.values(state).includes(""),
			"Все поля должны быть заполнены!"
		);
	}
];
