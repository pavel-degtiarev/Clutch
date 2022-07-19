import { TargetFormState } from "../../HOC/with-validate-submit/with-validate-submit";
import {
	FuelFormState,
	OtherFormState,
	ServiceFormState,
	SpareFormState,
} from "./form-init-states";

export interface FormValuesState {
	fuelState: FuelFormState;
	serviceState: ServiceFormState;
	spareState: SpareFormState;
	otherState: OtherFormState;
}

export type FormStateKeys = keyof FormValuesState;

export interface FormStateAction {
	key: FormStateKeys;
	payload: TargetFormState;
}
