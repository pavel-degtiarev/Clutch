import React from "react";
import { FuelFormFields, FuelFormState, OtherFormFields, OtherFormState, DetailsFormFields, DetailsFormState, ServiceFormFields, ServiceFormState, RepeatFormFields, RepeatFormState, SpareFormFields, SpareFormState } from "../../context/form-state/form-init-states";
import { FinalFormState } from "./check-form";

export type TargetFormFields =
  | FuelFormFields
  | SpareFormFields
  | OtherFormFields
  | ServiceFormFields
  | RepeatFormFields
  | DetailsFormFields;
  
export type TargetFormState =
  | FuelFormState
  | SpareFormState
  | OtherFormState
  | ServiceFormState
  | RepeatFormState
  | DetailsFormState;

export type setStateFunction<T extends TargetFormState> = (value: (prevState: T) => void) => void;

export type ValidateFunction<T extends TargetFormFields> = (target: T, value: string) => void;

type ValidateFunctionGetter<T extends TargetFormFields, V extends TargetFormState> = (setState: setStateFunction<V>) => ValidateFunction<T>

export type FinalFormCheckFunction<T extends TargetFormState> = (state: T) => boolean;

export type FormComponentProps<T extends TargetFormFields, V extends TargetFormState> = {
  getValidate: ValidateFunctionGetter<T, V>;
  finalCheck: FinalFormCheckFunction<V>;
};

type FormComponent<T extends TargetFormFields, V extends TargetFormState> = ({
  getValidate, finalCheck }: FormComponentProps<T, V>) => JSX.Element;

// =========================================

type WithValidateSubmitProps<T extends TargetFormFields, V extends TargetFormState> = {
  Form: FormComponent<T, V>;
  getValidate: ValidateFunctionGetter<T, V>;
  finalCheck: FinalFormCheckFunction<V>;
};

export default function WithValidateAndCheck<T extends TargetFormFields, V extends TargetFormState>({
  Form, getValidate, finalCheck }: WithValidateSubmitProps<T, V>) {
  return <Form getValidate={getValidate} finalCheck={finalCheck} />;
}
