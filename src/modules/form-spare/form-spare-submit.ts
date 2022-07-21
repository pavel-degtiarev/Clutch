import { SpareFormState } from "../../context/form-state/form-init-states";
import { prepareForm, saveForm, SpareFormFinalState } from "../../HOC/with-validate-submit/submit-form";
import { convertSpareFields } from "./form-spare-convert-fields";
import { formSpareCheckpoints } from "./form-spare-submit-checkpoints";

export default async function submitOtherForm(state: SpareFormState): Promise<boolean> {
  const finalFormState = prepareForm<SpareFormState, SpareFormFinalState>(
    state, formSpareCheckpoints, convertSpareFields);
  
  return await saveForm(finalFormState);

}
