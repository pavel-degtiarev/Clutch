import submitForm, { FuelFormFinalState } from "../../utilities/submit-form";
import { formFuelCheckpoints } from "./form-fuel-submit-checkpoints";
import { convertFuelFields } from "./form-fuel-convert-fields";
import { FuelFormState } from "../../store/form-init-states";

// ====================================

export default function submitFuelForm(state: FuelFormState): boolean {
	console.log("Send FormFuel data to API");
	
	return submitForm<FuelFormState, FuelFormFinalState>(
		state,
		formFuelCheckpoints,
		convertFuelFields
	);
}
