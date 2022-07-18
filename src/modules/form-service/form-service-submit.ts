import { ServiceFormState } from "../../store/form-init-states";
import submitForm, { ServiceFormFinalState } from "../../utilities/submit-form";
import { formServiceCheckpoints } from "./form-service-checkpoints";
import { convertServiceFields } from "./form-service-convert-fields";

export default async function submitServiceForm(state: ServiceFormState): Promise<boolean> {
	return await submitForm<ServiceFormState, ServiceFormFinalState>(
		state, formServiceCheckpoints, convertServiceFields);
}
