import { ServiceDetailsFormState } from "../../store/form-init-states";
import { ServiceDetailsFormFinalState } from "../../utilities/submit-form";

export function convertServiceDetailsFields(
  state: ServiceDetailsFormState): ServiceDetailsFormFinalState {
  
	const finalState: ServiceDetailsFormFinalState =
		state.services.length > 0 || state.spares.length > 0
			? {
					services: state.services.length > 0 ? state.services : null,
					spares: state.spares.length > 0 ? state.spares : null,
			  }
			: null;
  
	return finalState;
}
