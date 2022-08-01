import { OtherFormState } from "../../context/form-state/form-init-states";
import { checkForm } from "../../HOC/with-validate-check/check-form";
import { formOtherCheckpoints } from "./form-other-checkpoints";

export default async function checkOtherForm(state: OtherFormState): Promise<boolean> {
  return await checkForm<OtherFormState>(state, formOtherCheckpoints);
}
