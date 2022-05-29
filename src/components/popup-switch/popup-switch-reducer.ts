export const initState = {
	rollupOpened: false,
	popupOpened: false,
	currentPopup: {
		title: "",
		form: null,
	},
};

export function reducer(state: any, action: any) {
	console.log(action.type);
	
	switch (action.type) {
		case "ROLLUP_TOGGLED":
			return { ...state, rollupOpened: !state.rollupOpened };

		case "FORM_SELECTED":
			return {
				...state,
				popupOpened: !state.popupOpened,
				currentPopup: action.payload,
			};

		case "POPUP_CLOSED":
			return {
				...state,
				popupOpened: !state.popupOpened,
				currentPopup: {
					title: "",
					form: null,
				},
			};
	}

	return state;
}
