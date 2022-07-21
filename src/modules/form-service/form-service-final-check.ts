import { ServiceFormState } from "../../context/form-state/form-init-states";
import { checkForm } from "../../HOC/with-validate-check/check-form";
import { formServiceCheckpoints } from "./form-service-checkpoints";

export default function checkServiceForm(state: ServiceFormState): boolean {
  return checkForm<ServiceFormState>(state, formServiceCheckpoints);
}
