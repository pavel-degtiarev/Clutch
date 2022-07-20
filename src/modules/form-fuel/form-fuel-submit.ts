import { prepareForm, FuelFormFinalState, saveForm } from "../../HOC/with-validate-submit/submit-form";
import { formFuelCheckpoints } from "./form-fuel-submit-checkpoints";
import { convertFuelFields } from "./form-fuel-convert-fields";
import { FuelFormState } from "../../context/form-state/form-init-states";

// ====================================

export default async function submitFuelForm(state: FuelFormState): Promise<boolean> {
	const finalFormState = prepareForm<FuelFormState, FuelFormFinalState>(
		state, formFuelCheckpoints, convertFuelFields);

	return await saveForm(finalFormState);
}
