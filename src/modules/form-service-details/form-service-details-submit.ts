import { ServiceDetailsFormState } from "../../context/form-state/form-init-states";
import { prepareForm, ServiceDetailsFormFinalState } from "../../utilities/submit-form";
import { formServiceDetailsCheckpoints } from "./form-service-details-checkpoints";
import { convertServiceDetailsFields } from "./form-service-details-convert-fields";

export default async function submitServiceDetailsForm(state: ServiceDetailsFormState): Promise<boolean> {
	const finalFormState = prepareForm<ServiceDetailsFormState, ServiceDetailsFormFinalState>(
		state, formServiceDetailsCheckpoints, convertServiceDetailsFields);
	
	console.log(finalFormState);
	return true
}
