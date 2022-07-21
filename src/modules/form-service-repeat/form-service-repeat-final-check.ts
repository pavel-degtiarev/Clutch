import { RepeatFormState } from "../../context/form-state/form-init-states";
import { checkForm } from "../../HOC/with-validate-check/check-form";
import { formServiceRepeatCheckpoints } from "./form-service-repeat-checkpoints";

// ====================================

export default function checkServiceRepeatForm(state: RepeatFormState): boolean {
  return checkForm<RepeatFormState>(state, formServiceRepeatCheckpoints);
}
