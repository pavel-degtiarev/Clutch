import { DetailsFormState } from "../../context/form-state/form-init-states";
import { checkForm } from "../../HOC/with-validate-check/check-form";
import { formServiceDetailsCheckpoints } from "./form-service-details-checkpoints";

export default async function checkServiceDetailsForm(state: DetailsFormState): Promise<boolean> {
  return await checkForm<DetailsFormState>(state, formServiceDetailsCheckpoints);
}
