import { ServiceFormState } from "../../store/form-init-states";
import submitForm, { ServiceFormFinalState } from "../../utilities/submit-form";
import { formServiceCheckpoints } from "./form-service-checkpoints";
import { convertServiceFields } from "./form-service-convert-fields";

export default function submitServiceForm(state: ServiceFormState): boolean {
	console.log("Send FormService data to API");
	
	return submitForm<ServiceFormState, ServiceFormFinalState>(
		state,
		formServiceCheckpoints,
		convertServiceFields
	);
}
