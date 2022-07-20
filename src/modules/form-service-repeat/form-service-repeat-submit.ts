import { RepeatFormState } from "../../context/form-state/form-init-states";
import { prepareForm, repeatFormFinalState } from "../../HOC/with-validate-submit/submit-form";
import { formServiceRepeatCheckpoints } from "./form-service-repeat-checkpoints";
import { convertServiceRepeatFields } from "./form-service-repeat-convert-fields";

// ====================================

export default async function submitServiceRepeatForm(state: RepeatFormState): Promise<boolean> {
	const finalFormState = prepareForm<RepeatFormState, repeatFormFinalState>(
		state, formServiceRepeatCheckpoints, convertServiceRepeatFields);
	
	return !!finalFormState;
}
