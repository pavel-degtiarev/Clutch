import dayjs from "dayjs";
import { ServiceFormState } from "../../store/form-init-states";
import { ServiceFormFinalState } from "../../utilities/submit-form";

export function convertServiceFields(state: ServiceFormState): ServiceFormFinalState {
	const finalState: ServiceFormFinalState = {
		serviceDate: dayjs(state.serviceDate).toDate().valueOf(),
		serviceDescription: state.serviceDescription,
		serviceRun: Number(state.serviceRun),
		serviceTotal: Number(state.serviceTotal),
		serviceTotalDetails: state.serviceTotalDetails,
		serviceRepeat: state.serviceRepeat,
		serviceRepeatDetails: state.serviceRepeatDetails,
	};
	return finalState;
}
