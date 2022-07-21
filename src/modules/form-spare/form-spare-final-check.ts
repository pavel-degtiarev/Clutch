import { SpareFormState } from "../../context/form-state/form-init-states";
import { checkForm } from "../../HOC/with-validate-check/check-form";
import { formSpareCheckpoints } from "./form-spare-checkpoints";

export default function checkSpareForm(state: SpareFormState): boolean {
  return checkForm<SpareFormState>(state, formSpareCheckpoints);
}
