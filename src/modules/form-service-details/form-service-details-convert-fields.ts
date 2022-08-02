import { DetailsFormState } from "../../context/form-state/form-init-states";
import { DetailsFormFinalState } from "../../HOC/with-validate-check/check-form";

export function convertServiceDetailsFields(
  state: DetailsFormState): DetailsFormFinalState {
  
  const finalState: DetailsFormFinalState =
    state.services.length > 0 || state.spares.length > 0
      ? {
          services: state.services.length > 0 ? state.services : null,
          spares: state.spares.length > 0 ? state.spares : null,
        }
      : null;
  
  return finalState;
}
