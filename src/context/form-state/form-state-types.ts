import { TargetFormState } from "../../HOC/with-validate-check/with-validate-check";
import {
  DetailsFormState,
  FuelFormState,
  OtherFormState,
  RepeatFormState,
  ServiceFormState,
  SpareFormState,
} from "./form-init-states";

export interface FormValuesState {
  fuelState: FuelFormState;
  serviceState: ServiceFormState;
  spareState: SpareFormState;
  otherState: OtherFormState;
  repeatState: RepeatFormState;
  detailsState: DetailsFormState;
}

export type FormStateKeys = keyof FormValuesState;

export interface FormStateAction {
  key: FormStateKeys;
  payload: TargetFormState;
}
