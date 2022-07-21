import React from "react";
import { FuelFormFields, FuelFormState, OtherFormFields, OtherFormState, DetailsFormFields, DetailsFormState, ServiceFormFields, ServiceFormState, RepeatFormFields, RepeatFormState, SpareFormFields, SpareFormState } from "../../context/form-state/form-init-states";

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

export type SubmitFunction<T extends TargetFormState> = (state: T) => Promise<boolean>;

export type FormComponentProps<T extends TargetFormFields, V extends TargetFormState> = {
  getValidate: ValidateFunctionGetter<T, V>;
  submit: SubmitFunction<V>;
};

type FormComponent<T extends TargetFormFields, V extends TargetFormState> = ({
  getValidate, submit }: FormComponentProps<T, V>) => JSX.Element;

// =========================================

type WithValidateSubmitProps<T extends TargetFormFields, V extends TargetFormState> = {
  Form: FormComponent<T, V>;
  getValidate: ValidateFunctionGetter<T, V>;
  submit: SubmitFunction<V>;
};

export default function WithValidateSubmit<T extends TargetFormFields, V extends TargetFormState>({
  Form, getValidate, submit }: WithValidateSubmitProps<T, V>) {
  return <Form getValidate={getValidate} submit={submit} />;
}
