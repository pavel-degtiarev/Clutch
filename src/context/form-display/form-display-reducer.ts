import { ActionCreatorType, ActionTypes, PopupState } from "./form-display-types";
import * as actions from "./form-display-actions"

type ActionType = ReturnType<ActionCreatorType<typeof actions>>;

export const formDisplayInitState: PopupState = {
	rollupOpened: false,
	currentForm: null,
	currentSubform: null,
};

export function formDisplayReducer(state: PopupState, action: ActionType): PopupState {
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
