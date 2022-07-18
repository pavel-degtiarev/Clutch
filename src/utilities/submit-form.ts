import { TargetFormState } from "../HOC/with-validate-submit/with-validate-submit";

export type FuelFormFinalState = {
	fuelDate: number;
	fuelRun: number;
	fuelCost: number;
	fuelPrice: number;
	fuelVolume: number;
};

export type OtherFormFinalState = {
	otherDate: number;
	otherTitle: string;
	otherPrice: number
};

export type SpareFormFinalState = {
	spareDate: number;
	spareTitle: string;
	sparePrice: number
};

export type ServiceFormFinalState = {
	serviceDate: number;
	serviceDescription: string;
	serviceRun: number;
	serviceTotal: number;
	serviceRepeat: boolean;
	serviceDetails: {
		repeat: ServiceRepeatFormFinalState;
		details: ServiceDetailsFormFinalState;
	};
};

export type ServiceRepeatFormFinalState = {
	repeatByRun: boolean;
	repeatingRun: number;
	repeatByTime: boolean;
	repeatingTime: number;
	repeatTimeSlot: string;
} | null;

export type ServiceDetailsFormFinalState = {
	services: ServiceDetails[] | null;
	spares: ServiceDetails[] | null;
} | null;

export type FinalFormState =
	| FuelFormFinalState
	| OtherFormFinalState
	| SpareFormFinalState
	| ServiceRepeatFormFinalState
	| ServiceDetailsFormFinalState
	| ServiceFormFinalState;

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
