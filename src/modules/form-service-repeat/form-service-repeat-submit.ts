import { ServiceRepeatFormState } from "../../store/form-init-states";
import submitForm, { ServiceRepeatFormFinalState } from "../../utilities/submit-form";
import { formServiceRepeatCheckpoints } from "./form-service-repeat-checkpoints";
import { convertServiceRepeatFields } from "./form-service-repeat-convert-fields";

// ====================================

export default function submitServiceRepeatForm(state: ServiceRepeatFormState): boolean {
	console.log("Send FormServiceRepeat data to API");

	return submitForm<ServiceRepeatFormState, ServiceRepeatFormFinalState>(
		state,
		formServiceRepeatCheckpoints,
		convertServiceRepeatFields
	);
}
