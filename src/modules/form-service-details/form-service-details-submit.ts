import { ServiceDetailsFormState } from "../../store/form-init-states";
import submitForm, { ServiceDetailsFormFinalState } from "../../utilities/submit-form";
import { formServiceDetailsCheckpoints } from "./form-service-details-checkpoints";
import { convertServiceDetailsFields } from "./form-service-details-convert-fields";

export default async function submitServiceDetailsForm(state: ServiceDetailsFormState): Promise<boolean> {
	return await submitForm<ServiceDetailsFormState, ServiceDetailsFormFinalState>(
		state, formServiceDetailsCheckpoints, convertServiceDetailsFields);
}
