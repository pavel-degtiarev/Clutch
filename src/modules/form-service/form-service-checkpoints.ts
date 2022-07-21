import { ServiceFormState } from "../../context/form-state/form-init-states";
import { checkpoint } from "../../HOC/with-validate-check/checkpoint";

export const formServiceCheckpoints: Checkpoint<ServiceFormState>[] = [
	function noEmptyFields(state: ServiceFormState): boolean {
		return checkpoint(
			() => !Object.values(state).includes(""),
			"Все поля должны быть заполнены!"
		);
	}
];
