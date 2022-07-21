import { OtherFormState } from "../../context/form-state/form-init-states";
import { prepareForm, OtherFormFinalState, saveForm } from "../../HOC/with-validate-submit/submit-form";
import { convertOtherFields } from "./form-other-convert-fields";
import { formOtherCheckpoints } from "./form-other-submit-checkpoints";

export default async function submitOtherForm(state: OtherFormState): Promise<boolean> {
  const finalFormState = prepareForm<OtherFormState, OtherFormFinalState>(
    state, formOtherCheckpoints, convertOtherFields);

  return await saveForm(finalFormState);
}
