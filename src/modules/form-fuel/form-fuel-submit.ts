import { prepareForm, FuelFormFinalState, saveForm } from "../../utilities/submit-form";
import { formFuelCheckpoints } from "./form-fuel-submit-checkpoints";
import { convertFuelFields } from "./form-fuel-convert-fields";
import { FuelFormState } from "../../store/form-init-states";

// ====================================

export default async function submitFuelForm(state: FuelFormState): Promise<boolean> {
	const finalFormState = prepareForm<FuelFormState, FuelFormFinalState>(
		state, formFuelCheckpoints, convertFuelFields);

	return await saveForm(finalFormState);
}
