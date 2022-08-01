import { RepeatFormState } from "../../context/form-state/form-init-states";
import { checkForm } from "../../HOC/with-validate-check/check-form";
import { formServiceRepeatCheckpoints } from "./form-service-repeat-checkpoints";

// ====================================

export default async function checkServiceRepeatForm(state: RepeatFormState): Promise<boolean> {
  return await checkForm<RepeatFormState>(state, formServiceRepeatCheckpoints);
}
