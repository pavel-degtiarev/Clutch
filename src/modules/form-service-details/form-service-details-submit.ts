import { ServiceDetailsFormState } from "../../store/form-init-states";
import submitForm, { ServiceDetailsFormFinalState } from "../../utilities/submit-form";
import { formServiceDetailsCheckpoints } from "./form-service-details-checkpoints";
import { convertServiceDetailsFields } from "./form-service-details-convert-fields";

export default function submitServiceDetailsForm(state: ServiceDetailsFormState): boolean {
	console.log("Send FormServiceDetails data to API");
	
	return submitForm<ServiceDetailsFormState, ServiceDetailsFormFinalState>(
		state,
		formServiceDetailsCheckpoints,
		convertServiceDetailsFields
	);
}
