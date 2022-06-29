import * as actions from "./popup-switch-actions";
import { ActionCreatorType, ActionTypes, PopupState } from "./popup-switch.types";

type ActionType = ReturnType<ActionCreatorType<typeof actions>>;

export const initState: PopupState = {
	rollupOpened: false,
	currentForm: null,
	currentSubform: null,
};

export function reducer(state: PopupState, action: ActionType): PopupState {

	console.log(action);
	
	switch (action.type) {
		case ActionTypes.ROLLUP_TOGGLED:
			return {
				...state,
				rollupOpened: !state.rollupOpened,
			};

		case ActionTypes.FORM_SELECTED:
			return {
				...state,
				currentForm: action.payload,
			};

		case ActionTypes.SUBFORM_SELECTED:
			return {
				...state,
				currentSubform: action.payload,
			};

		case ActionTypes.FORM_CLOSED:
			return {
				...state,
				currentForm: null,
			};

		case ActionTypes.SUBFORM_CLOSED:
			return {
				...state,
				currentSubform: null,
			};
	}

	return state;
}
