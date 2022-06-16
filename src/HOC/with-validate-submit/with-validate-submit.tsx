import React, { createContext } from "react";
import { FuelFormFields, FuelFormState } from "../../modules/form-fuel/form-fuel";
import { OtherFormFields, OtherFormState } from "../../modules/form-other/form-other";
import { ServiceRepeatFormFields, ServiceRepeatFormState } from "../../modules/form-service-repeat/form-service-repeat";
import { ServiceFormFields, ServiceFormState } from "../../modules/form-service/form-service";
import { SpareFormFields, SpareFormState } from "../../modules/form-spare/form-spare";

export type TargetFormFields =
	| FuelFormFields
	| SpareFormFields
	| OtherFormFields
	| ServiceFormFields
	| ServiceRepeatFormFields;
	
export type TargetFormState =
	| FuelFormState
	| SpareFormState
	| OtherFormState
	| ServiceFormState
	| ServiceRepeatFormState;

export type setStateFunction<T extends TargetFormState> = (value: (prevState: T) => void) => void;

export type ValidateFunction<T extends TargetFormFields> = (target: T, value: string) => void;

type ValidateFunctionGetter<T extends TargetFormFields, V extends TargetFormState> = (setState: setStateFunction<V>) => ValidateFunction<T>

export type SubmitFunction<T extends TargetFormFields> = (formFields: FormFields<T>) => boolean;

export type FormComponentProps<T extends TargetFormFields, V extends TargetFormState> = {
	getValidate: ValidateFunctionGetter<T, V>;
	submit: SubmitFunction<T>;
};

type FormComponent<T extends TargetFormFields, V extends TargetFormState> = ({
	getValidate, submit }: FormComponentProps<T, V>) => JSX.Element;

// =========================================

type WithValidateSubmitProps<T extends TargetFormFields, V extends TargetFormState> = {
	Form: FormComponent<T, V>;
	getValidate: ValidateFunctionGetter<T, V>;
	submit: SubmitFunction<T>;
};

export default function WithValidateSubmit<T extends TargetFormFields, V extends TargetFormState>({
	Form, getValidate, submit }: WithValidateSubmitProps<T, V>) {
	return <Form getValidate={getValidate} submit={submit} />;
}
