import { dbNames } from "../API/init-db";
import saveToDb from "../API/save";
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
	otherPrice: number;
};

export type SpareFormFinalState = {
	spareDate: number;
	spareTitle: string;
	sparePrice: number;
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

export default async function submitForm<T extends TargetFormState, V extends FinalFormState>(
	state: T,
	checkpoints: Checkpoint<T>[],
	convertFields: (state: T) => V
): Promise<boolean> {
	for (const checkpoint of checkpoints) {
		if (!checkpoint(state)) return false;
	}

	const finalState: V = convertFields(state);
	const storeName = getStoreName<V>(finalState);

	return await saveToDb(storeName, finalState, () => console.log("save ok", finalState));
}

function getStoreName<T extends FinalFormState>(value: T): string {
	switch (true) {
		case value!.hasOwnProperty("fuelDate"): return dbNames.FUEL;
		case value!.hasOwnProperty("otherDate"): return dbNames.OTHER;
		case value!.hasOwnProperty("spareDate"): return dbNames.SPARE;
		case value!.hasOwnProperty("serviveDate"): return dbNames.SERVICE;
	}
	return "" as never;
}
