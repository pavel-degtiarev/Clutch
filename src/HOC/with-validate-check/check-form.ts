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
  serviceTotalDetails: DetailsFormFinalState;
};

export type RepeatFormFinalState = {
  serviceId: number;
  repeatByRun: boolean;
  repeatingRun: number;
  repeatByTime: boolean;
  repeatingTime: number;
  repeatTimeSlot: string;
};

export type DetailsFormFinalState = {
  services: ServiceDetails[] | null;
  spares: ServiceDetails[] | null;
} | null;

export type FinalBasicFormsState =
  | FuelFormFinalState
  | OtherFormFinalState
  | SpareFormFinalState
  | ServiceFormFinalState
  | RepeatFormFinalState;

// ==============================================

export async function checkForm<T extends TargetFormState>(
  state: T, checkpoints: Checkpoint<T>[] ): Promise<boolean> {
  for (const checkpoint of checkpoints) {
    if (!await checkpoint(state)) return false;
  }

  return true;
}
