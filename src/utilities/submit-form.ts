import { TargetFormState } from "../HOC/with-validate-submit/with-validate-submit";
import { FuelFormFields } from "../modules/form-fuel/form-fuel";
import { OtherFormFields } from "../modules/form-other/form-other";

export type FuelFormFinalState = { [key in FuelFormFields]: number };
export type OtherFormFinalState = { otherDate: number, otherTitle: string, otherPrice: number};

export type FinalFormState = FuelFormFinalState | OtherFormFinalState;

// ==============================================

export default function submitForm<T extends TargetFormState, V extends FinalFormState>(
  state: T, checkpoints: Checkpoint<T>[], convertFields: (state: T) => V): boolean {
  
	for (const checkpoint of checkpoints) {
		if (!checkpoint(state)) return false;
	}

	const finalState: V = convertFields(state);
	console.log(finalState);

	return true;
}
