import { FormValuesState, FormStateAction } from "./form-state-types";
import {
  detailsFormInitState,
  fuelFormInitState,
  otherFormInitState,
  repeatFormInitState,
  serviceFormInitState,
  spareFormInitState,
} from "./form-init-states";

export const formsInitState: FormValuesState = {
  fuelState: fuelFormInitState,
  serviceState: serviceFormInitState,
  spareState: spareFormInitState,
  otherState: otherFormInitState,
  repeatState: repeatFormInitState,
  detailsState: detailsFormInitState
};

// ============================================

export function formStateReducer(state: FormValuesState, action: FormStateAction) {
  if (action.key && action.payload) {
    return { ...state, [action.key]: action.payload };
  }

  return state;
}
