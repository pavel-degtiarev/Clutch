import { SpareFormState } from "../../store/form-init-states";
import submitForm, { SpareFormFinalState } from "../../utilities/submit-form";
import { convertSpareFields } from "./form-spare-convert-fields";
import { formSpareCheckpoints } from "./form-spare-submit-checkpoints";

export default function submitOtherForm(state: SpareFormState): boolean {
	console.log("Send FormSpare data to API");

	return submitForm<SpareFormState, SpareFormFinalState>(
		state,
		formSpareCheckpoints,
		convertSpareFields
	);
}
