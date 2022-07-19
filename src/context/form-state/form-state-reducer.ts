import { FormValuesState, FormStateAction } from "./form-state-types";
import {
	fuelFormInitState,
	otherFormInitState,
	ServiceFormInitState,
	spareFormInitState,
} from "./form-init-states";

export const formsInitState: FormValuesState = {
	fuelState: fuelFormInitState,
	serviceState: ServiceFormInitState,
	spareState: spareFormInitState,
	otherState: otherFormInitState,
};

// ============================================

export function formStateReducer(state: FormValuesState, action: FormStateAction) {
	if (action.key && action.payload) {
		return { ...state, [action.key]: action.payload };
	}

	return state;
}
