import React from "react";

export type FormSubmitHandler = (formRef: HTMLFormElement) => boolean;

export type FormItem = {
	title: string;
	form: React.ReactNode;
};

export enum ActionTypes {
	FORM_SELECTED = "FORM_SELECTED",
	ROLLUP_TOGGLED = "ROLLUP_TOGGLED",
	POPUP_CLOSED = "POPUP_CLOSED",
}

export type Action = {
	type: keyof typeof ActionTypes;
	payload?: FormItem;
};

export type ActionCreatorType<T> = T extends { [key: string]: infer U } ? U : never;

export type PopupState = {
	rollupOpened: boolean;
	popupOpened: boolean;
	currentPopup: FormItem | null | undefined;
};
