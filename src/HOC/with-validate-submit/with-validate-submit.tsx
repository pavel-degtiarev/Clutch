import React from "react";
import { FuelFormFields, FuelFormState } from "../../modules/form-fuel/form-fuel";
import { OtherFormFields, OtherFormState } from "../../modules/form-other/form-other";
import { ServiceFormFields, ServiceFormState } from "../../modules/form-service/form-service";
import { SpareFormFields, SpareFormState } from "../../modules/form-spare/form-spare";

type TargetFormFields = FuelFormFields | SpareFormFields | OtherFormFields | ServiceFormFields;
type TargetFormState = FuelFormState | SpareFormState | OtherFormState | ServiceFormState;

export type setStateFunction<T extends TargetFormState> = (value: (prevState: T) => void) => void;

type ValidateFunction<T extends TargetFormFields, V extends TargetFormState> = (
	target: T,
	value: string,
	setState: setStateFunction<V>
) => void;

type SubmitFunction<T extends TargetFormFields> = (formFields: FormFields<T>) => boolean;

export type FormComponentProps<T extends TargetFormFields, V extends TargetFormState> = {
	validate: ValidateFunction<T, V>;
	submit: SubmitFunction<T>;
};

type FormComponent<T extends TargetFormFields, V extends TargetFormState> = ({
	validate,
	submit,
}: FormComponentProps<T, V>) => JSX.Element;

// =========================================

type WithValidateSubmitProps<T extends TargetFormFields, V extends TargetFormState> = {
	Form: FormComponent<T, V>;
	validate: ValidateFunction<T, V>;
	submit: SubmitFunction<T>;
};

export default function WithValidateSubmit<T extends TargetFormFields, V extends TargetFormState>({
	Form, validate, submit }: WithValidateSubmitProps<T, V>) {
	return <Form validate={validate} submit={submit} />;
}

export function WithValidateSubmitFunc<T extends TargetFormFields, V extends TargetFormState>(
	validate: ValidateFunction<T, V>,
	submit: SubmitFunction<T>
) {
	return function FormComponent(Form: FormComponent<T, V>) {
		return <Form validate={validate} submit={ submit}/>
	}
};
