import { OtherFormState } from "../../context/form-state/form-init-states";
import { checkForm } from "../../HOC/with-validate-check/check-form";
import { formOtherCheckpoints } from "./form-other-checkpoints";

export default function checkOtherForm(state: OtherFormState): boolean {
  return checkForm<OtherFormState>(state, formOtherCheckpoints);
}
