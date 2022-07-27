import { FinalBasicFormsState, FuelFormFinalState, OtherFormFinalState, ServiceFormFinalState, SpareFormFinalState } from "./check-form";

export function isFuelFormFinalState(item: FinalBasicFormsState): item is FuelFormFinalState {
  return item.hasOwnProperty("fuelDate");
}

export function isOtherFormFinalState(item: FinalBasicFormsState): item is OtherFormFinalState {
  return item.hasOwnProperty("otherDate");
}

export function isSpareFormFinalState(item: FinalBasicFormsState): item is SpareFormFinalState {
  return item.hasOwnProperty("spareDate");
}

export function isServiceFormFinalState(item: FinalBasicFormsState): item is ServiceFormFinalState {
  return item.hasOwnProperty("serviceDate");
}
