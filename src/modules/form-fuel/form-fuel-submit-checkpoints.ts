import { FuelFormState } from "../../context/form-state/form-init-states";
import { submitCheckpoint } from "../../HOC/with-validate-submit/submit-checkpoint";

export const formFuelCheckpoints: Checkpoint<FuelFormState>[] = [
	function noEmptyFields(state: FuelFormState): boolean {
		return submitCheckpoint(
			() => !Object.values(state).includes(""),
			"Все поля должны быть заполнены!"
		);
	},

	function noZeroRun(state: FuelFormState): boolean {
		return submitCheckpoint(
			() => Number(state.fuelRun) !== 0,
			"Пробег не может быть нулевым!"
		);
	},

	function noZeroVolume(state: FuelFormState): boolean {
		return submitCheckpoint(
			() => Number(state.fuelVolume) !== 0,
			"Объем не может быть нулевым!"
		);
	},
];
