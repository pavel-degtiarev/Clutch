import submitForm, { OtherFormFinalState } from "../../utilities/submit-form";
import { OtherFormState } from "./form-other";
import { convertOtherFields } from "./form-other-convert-fields";
import { formOtherCheckpoints } from "./form-other-submit-checkpoints";

export default function submitOtherForm(state: OtherFormState): boolean {
	console.log("Send FormOther data to API");

	return submitForm<OtherFormState, OtherFormFinalState>(
		state,
		formOtherCheckpoints,
		convertOtherFields
	);
}
