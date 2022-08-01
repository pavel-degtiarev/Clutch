import { SpareFormState } from "../../context/form-state/form-init-states";
import { checkForm } from "../../HOC/with-validate-check/check-form";
import { formSpareCheckpoints } from "./form-spare-checkpoints";

export default async function checkSpareForm(state: SpareFormState): Promise<boolean> {
  return await checkForm<SpareFormState>(state, formSpareCheckpoints);
}
