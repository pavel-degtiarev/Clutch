import { OtherFormState } from "../../store/form-init-states";
import submitForm, { OtherFormFinalState } from "../../utilities/submit-form";
import { convertOtherFields } from "./form-other-convert-fields";
import { formOtherCheckpoints } from "./form-other-submit-checkpoints";

export default async function submitOtherForm(state: OtherFormState): Promise<boolean> {
	return await submitForm<OtherFormState, OtherFormFinalState>(
		state, formOtherCheckpoints, convertOtherFields);
}
