import dayjs from "dayjs";
import { ServiceFormFields, ServiceFormState } from "../../store/form-init-states";
import { ServiceFormFinalState } from "../../utilities/submit-form";

export function convertServiceFields(state: ServiceFormState): ServiceFormFinalState {
	const finalState: ServiceFormFinalState = {
		serviceDate: dayjs(state.serviceDate).toDate().valueOf(),
		serviceDescription: state.serviceDescription,
		serviceRun: Number(state.serviceRun),
		serviceTotal: Number(state.serviceTotal),
		serviceRepeat: state.serviceRepeat,
		serviceDetails: {
			repeat: null,
			details: null,
		},
	};
	return finalState;
}
