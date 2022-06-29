import React from "react";

export type FormSubmitHandler = (formRef: HTMLFormElement) => boolean;

export type FormItem = {
	title: string;
	form: React.ReactNode;
};

export enum ActionTypes {
	ROLLUP_TOGGLED = "ROLLUP_TOGGLED",
	FORM_SELECTED = "FORM_SELECTED",
	SUBFORM_SELECTED = "SUBFORM_SELECTED",
	FORM_CLOSED = "FORM_CLOSED",
	SUBFORM_CLOSED = "SUBFORM_CLOSED",
}

export type Action = {
	type: keyof typeof ActionTypes;
	payload?: FormItem;
};

export type ActionCreatorType<T> = T extends { [key: string]: infer U } ? U : never;

export type PopupState = {
	rollupOpened: boolean;
	currentForm: FormItem | null | undefined;
	currentSubform: FormItem | null | undefined;
};
