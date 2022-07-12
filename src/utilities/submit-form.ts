import { TargetFormState } from "../HOC/with-validate-submit/with-validate-submit";
import { FuelFormFields } from "../modules/form-fuel/form-fuel";

export type FuelFormFinalState = { [key in FuelFormFields]: number };
export type OtherFormFinalState = { otherDate: number; otherTitle: string; otherPrice: number };
export type SpareFormFinalState = { spareDate: number; spareTitle: string; sparePrice: number };
export type ServiceRepeatFormFinalState = {
	repeatByRun: boolean;
	repeatingRun: number;
	repeatByTime: boolean;
	repeatingTime: number;
	repeatTimeSlot: string;
};

export type FinalFormState =
	| FuelFormFinalState
	| OtherFormFinalState
	| SpareFormFinalState
	| ServiceRepeatFormFinalState;

// ==============================================

export default function submitForm<T extends TargetFormState, V extends FinalFormState>(
	state: T,
	checkpoints: Checkpoint<T>[],
	convertFields: (state: T) => V
): boolean {
	for (const checkpoint of checkpoints) {
		if (!checkpoint(state)) return false;
	}

	const finalState: V = convertFields(state);
	console.log(finalState);

	return true;
}
