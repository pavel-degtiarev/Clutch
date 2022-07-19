import { DetailsFormState } from "../../context/form-state/form-init-states";
import { detailsFormFinalState } from "../../utilities/submit-form";

export function convertServiceDetailsFields(
  state: DetailsFormState): detailsFormFinalState {
  
	const finalState: detailsFormFinalState =
		state.services.length > 0 || state.spares.length > 0
			? {
					services: state.services.length > 0 ? state.services : null,
					spares: state.spares.length > 0 ? state.spares : null,
			  }
			: null;
  
	return finalState;
}
