import { dbStoreName } from "../../API/init-db";
import saveToDb from "../../API/save";
import { TargetFormState } from "./with-validate-check";

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
  serviceTotalDetails: detailsFormFinalState;
  serviceRepeat: boolean;
  serviceRepeatDetails: repeatFormFinalState;
};

export type repeatFormFinalState = {
  repeatByRun: boolean;
  repeatingRun: number;
  repeatByTime: boolean;
  repeatingTime: number;
  repeatTimeSlot: string;
} | null;

export type detailsFormFinalState = {
  services: ServiceDetails[] | null;
  spares: ServiceDetails[] | null;
} | null;

export type FinalFormState =
  | FuelFormFinalState
  | OtherFormFinalState
  | SpareFormFinalState
  | repeatFormFinalState
  | detailsFormFinalState
  | ServiceFormFinalState;

// ==============================================

export function checkForm<T extends TargetFormState>(
  state: T, checkpoints: Checkpoint<T>[] ): boolean {
  for (const checkpoint of checkpoints) {
    if (!checkpoint(state)) return false;
  }

  return true;
}

// export async function saveForm<T extends FinalFormState>(
//   finalState: T, onSaveSuccess?: (...args: any[]) => any): Promise<boolean> {
  
//   if (!finalState) return false;
//   const storeName = getStoreName<T>(finalState);
//   return await saveToDb<T>(storeName, finalState, onSaveSuccess);
// }
