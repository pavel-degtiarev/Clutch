import { Action, ActionTypes, FormItem } from "./popup-switch.types";

export function rollupToggled(): Action {
	return {
		type: ActionTypes.ROLLUP_TOGGLED,
	} as const;
}

export function formSelected(payload: FormItem): Action {
	return {
		type: ActionTypes.FORM_SELECTED,
		payload: payload,
	} as const;
}

export function subformSelected(payload: FormItem): Action {
	return {
		type: ActionTypes.SUBFORM_SELECTED,
		payload: payload,
	} as const;
}

export function formClosed(): Action {
	return {
		type: ActionTypes.FORM_CLOSED,
	} as const;
}

export function subformClosed(): Action {
	return {
		type: ActionTypes.SUBFORM_CLOSED,
	} as const;
}
