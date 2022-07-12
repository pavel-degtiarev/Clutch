import submitForm, { FuelFormFinalState } from "../../utilities/submit-form";
import { FuelFormState } from "./form-fuel";
import { formFuelCheckpoints } from "./form-fuel-submit-checkpoints";
import { convertFuelFields } from "./form-fuel-convert-fields";

// ====================================

export default function submitFuelForm(state: FuelFormState): boolean {
	console.log("Send FormFuel data to API");
	
	return submitForm<FuelFormState, FuelFormFinalState>(
		state,
		formFuelCheckpoints,
		convertFuelFields
	);
}
