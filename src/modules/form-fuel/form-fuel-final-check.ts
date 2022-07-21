import { checkForm } from "../../HOC/with-validate-check/check-form";
import { formFuelCheckpoints } from "./form-fuel-checkpoints";
import { FuelFormState } from "../../context/form-state/form-init-states";

// ====================================

export default function checkFuelForm(state: FuelFormState): boolean {
  return checkForm<FuelFormState>(state, formFuelCheckpoints);
}
