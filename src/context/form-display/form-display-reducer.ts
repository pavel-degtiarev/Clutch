import { FormDisplayActionTypes, PopupState } from "./form-display-types";
import * as actions from "./form-display-actions"

type ActionType = ReturnType<ActionCreatorType<typeof actions>>;

export const formDisplayInitState: PopupState = {
	rollupOpened: false,
	currentForm: null,
	currentSubform: null,
};

export function formDisplayReducer(state: PopupState, action: ActionType): PopupState {

	switch (action.type) {
		case FormDisplayActionTypes.ROLLUP_TOGGLED:
			return {
				...state,
				rollupOpened: !state.rollupOpened,
			};

		case FormDisplayActionTypes.FORM_SELECTED:
			return {
				...state,
				currentForm: action.payload,
			};

		case FormDisplayActionTypes.SUBFORM_SELECTED:
			return {
				...state,
				currentSubform: action.payload,
			};

		case FormDisplayActionTypes.FORM_CLOSED:
			return {
				...state,
				currentForm: null,
			};

		case FormDisplayActionTypes.SUBFORM_CLOSED:
			return {
				...state,
				currentSubform: null,
			};
	}

	return state;
}
