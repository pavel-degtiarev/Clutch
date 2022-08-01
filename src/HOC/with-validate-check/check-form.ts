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

export type FinalAllFormsState =
  | FuelFormFinalState
  | OtherFormFinalState
  | SpareFormFinalState
  | repeatFormFinalState
  | detailsFormFinalState
  | ServiceFormFinalState;

export type FinalBasicFormsState =
  | FuelFormFinalState
  | OtherFormFinalState
  | SpareFormFinalState
  | ServiceFormFinalState;

// ==============================================

export async function checkForm<T extends TargetFormState>(
  state: T, checkpoints: Checkpoint<T>[] ): Promise<boolean> {
  for (const checkpoint of checkpoints) {
    if (!await checkpoint(state)) return false;
  }

  return true;
}
