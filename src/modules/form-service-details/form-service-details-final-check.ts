import { DetailsFormState } from "../../context/form-state/form-init-states";
import { checkForm } from "../../HOC/with-validate-check/check-form";
import { formServiceDetailsCheckpoints } from "./form-service-details-checkpoints";

export default function checkServiceDetailsForm(state: DetailsFormState): boolean {
  return checkForm<DetailsFormState>(state, formServiceDetailsCheckpoints);
}
