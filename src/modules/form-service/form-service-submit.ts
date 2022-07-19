import { ServiceFormState } from "../../context/form-state/form-init-states";
import { prepareForm, saveForm, ServiceFormFinalState } from "../../utilities/submit-form";
import { formServiceCheckpoints } from "./form-service-checkpoints";
import { convertServiceFields } from "./form-service-convert-fields";

export default async function submitServiceForm(state: ServiceFormState): Promise<boolean> {
	const finalFormState = prepareForm<ServiceFormState, ServiceFormFinalState>(
		state, formServiceCheckpoints, convertServiceFields);

	return await saveForm(finalFormState);

}
