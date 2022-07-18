import { SpareFormState } from "../../store/form-init-states";
import { prepareForm, saveForm, SpareFormFinalState } from "../../utilities/submit-form";
import { convertSpareFields } from "./form-spare-convert-fields";
import { formSpareCheckpoints } from "./form-spare-submit-checkpoints";

export default async function submitOtherForm(state: SpareFormState): Promise<boolean> {
	const finalFormState = prepareForm<SpareFormState, SpareFormFinalState>(
		state, formSpareCheckpoints, convertSpareFields);
	
	return await saveForm(finalFormState);

}
