import { ServiceFormState } from "../../context/form-state/form-init-states";
import { submitCheckpoint } from "../../utilities/submit-checkpoint";

export const formServiceCheckpoints: Checkpoint<ServiceFormState>[] = [
	function noEmptyFields(state: ServiceFormState): boolean {
		return submitCheckpoint(
			() => !Object.values(state).includes(""),
			"Все поля должны быть заполнены!"
		);
	}
];
