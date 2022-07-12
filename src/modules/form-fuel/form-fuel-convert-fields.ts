import dayjs from "dayjs";
import { FuelFormFinalState } from "../../utilities/submit-form";
import { FuelFormFields, FuelFormState } from "./form-fuel";

export function convertFuelFields(state: FuelFormState): FuelFormFinalState {

	const tempState: any = { ...state, fuelDate: String(dayjs(state.fuelDate).toDate().valueOf()) };
	Object.keys(tempState).forEach(
		(key) => (tempState[key as FuelFormFields] = Number(tempState[key as FuelFormFields]))
	);
	
	const finalState: FuelFormFinalState = tempState;
	return finalState;
}
