import * as actions from "./popup-switch-actions";
import { ActionCreatorType, ActionTypes, PopupState } from "./popup-switch.types";

type ActionType = ReturnType<ActionCreatorType<typeof actions>>;

export const initState: PopupState = {
	rollupOpened: false,
	popupOpened: false,
	currentPopup: null,
};

export function reducer(state: PopupState, action: ActionType): PopupState {

	switch (action.type) {
		case ActionTypes.ROLLUP_TOGGLED:
			return {
				...state,
				rollupOpened: !state.rollupOpened,
			};

		case ActionTypes.FORM_SELECTED:
			return {
				...state,
				popupOpened: !state.popupOpened,
				currentPopup: action.payload,
			};

		case ActionTypes.POPUP_CLOSED:
			return {
				...state,
				popupOpened: !state.popupOpened,
				currentPopup: null,
			};
	}

	return state;
}
