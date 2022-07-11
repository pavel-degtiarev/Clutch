import dayjs from "dayjs";
import { FuelFormFields, FuelFormState } from "./form-fuel";
import { checkpoints } from "./form-fuel-submit-checkpoints";

type FinalState = { [key in FuelFormFields]: string | number };

function convertFields(state: FuelFormState): FinalState {
	const finalState: FinalState = { ...state, fuelDate: dayjs(state.fuelDate).toDate().valueOf() };
	Object.keys(finalState).forEach(
		(key) => (finalState[key as FuelFormFields] = Number(finalState[key as FuelFormFields]))
	);
	return finalState;
}

// ====================================

export default function submitFuelForm(state: FuelFormState): boolean {
	for (const checkpoint of checkpoints) {
		if (!checkpoint(state)) return false;
	}

	const finalState: FinalState = convertFields(state);

	console.log("Send FormFuel data to API", finalState);
	return true;
}
