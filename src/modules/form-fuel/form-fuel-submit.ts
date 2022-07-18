import submitForm, { FuelFormFinalState } from "../../utilities/submit-form";
import { formFuelCheckpoints } from "./form-fuel-submit-checkpoints";
import { convertFuelFields } from "./form-fuel-convert-fields";
import { FuelFormState } from "../../store/form-init-states";

// ====================================

export default async function submitFuelForm(state: FuelFormState): Promise<boolean> {	
	return await submitForm<FuelFormState, FuelFormFinalState>(
		state, formFuelCheckpoints, convertFuelFields);
}
