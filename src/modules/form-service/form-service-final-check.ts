import { ServiceFormState } from "../../context/form-state/form-init-states";
import { checkForm } from "../../HOC/with-validate-check/check-form";
import { formServiceCheckpoints } from "./form-service-checkpoints";

export default async function checkServiceForm(state: ServiceFormState): Promise<boolean> {
  return await checkForm<ServiceFormState>(state, formServiceCheckpoints);
}
