import { Action, ActionTypes, FormItem } from "./popup-switch.types";

export function formSelected(payload: FormItem): Action {
	return {
		type: ActionTypes.FORM_SELECTED,
		payload: payload,
	} as const;
}

export function rollupToggled(): Action {
	return {
		type: ActionTypes.ROLLUP_TOGGLED,
	} as const;
}

export function popupClosed(): Action {
	return {
		type: ActionTypes.POPUP_CLOSED,
	} as const;
}
