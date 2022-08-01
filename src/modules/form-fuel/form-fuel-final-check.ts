import { checkForm } from "../../HOC/with-validate-check/check-form";
import { formFuelCheckpoints } from "./form-fuel-checkpoints";
import { FuelFormState } from "../../context/form-state/form-init-states";

// ====================================

export default async function checkFuelForm(state: FuelFormState): Promise<boolean> {
  return await checkForm<FuelFormState>(state, formFuelCheckpoints);
}
