import dayjs from "dayjs";
import { ServiceFormFinalState } from "../../utilities/submit-form";
import { ServiceFormFields, ServiceFormState } from "./form-service";

export function convertServiceFields(state: ServiceFormState): ServiceFormFinalState {
	const tempState: any = { ...state, fuelDate: String(dayjs(state.serviceDate).toDate().valueOf()) };
	Object.keys(tempState).forEach(
		(key) => (tempState[key as ServiceFormFields] = Number(tempState[key as ServiceFormFields]))
	);

	const finalState: ServiceFormFinalState = tempState;
	return finalState;
}
