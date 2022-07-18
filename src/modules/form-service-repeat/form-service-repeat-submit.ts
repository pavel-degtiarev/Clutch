import { ServiceRepeatFormState } from "../../store/form-init-states";
import submitForm, { ServiceRepeatFormFinalState } from "../../utilities/submit-form";
import { formServiceRepeatCheckpoints } from "./form-service-repeat-checkpoints";
import { convertServiceRepeatFields } from "./form-service-repeat-convert-fields";

// ====================================

export default async function submitServiceRepeatForm(state: ServiceRepeatFormState): Promise<boolean> {
	return await submitForm<ServiceRepeatFormState, ServiceRepeatFormFinalState>(
		state, formServiceRepeatCheckpoints, convertServiceRepeatFields);
}
