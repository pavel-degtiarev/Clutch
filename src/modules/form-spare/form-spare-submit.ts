import { SpareFormState } from "../../store/form-init-states";
import submitForm, { SpareFormFinalState } from "../../utilities/submit-form";
import { convertSpareFields } from "./form-spare-convert-fields";
import { formSpareCheckpoints } from "./form-spare-submit-checkpoints";

export default async function submitOtherForm(state: SpareFormState): Promise<boolean> {
	return await submitForm<SpareFormState, SpareFormFinalState>(
		state, formSpareCheckpoints, convertSpareFields);
}
