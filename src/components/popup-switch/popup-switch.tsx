import React, { useReducer } from "react";
import ButtonRollup from "../../modules/button-rollup/button-rollup";
import PopupContainer from "../popup-container/popup-container";
import {initState, reducer } from "./popup-switch-reducer";
import { FormItem } from "./popup-switch.types";


type PopupSwitchProps = {
	forms: FormItem[];
};

export default function PopupSwitch({ forms }: PopupSwitchProps) {
	const [state, dispatch] = useReducer(reducer, initState);
	
	return (
		<>
			<ButtonRollup
				title="Потратить деньги"
				forms={forms}
				rollupOpened={state.rollupOpened}
				dispatch={dispatch}
			/>
			<PopupContainer
				opened={state.popupOpened}
				title={state.currentPopup?.title}
				form={state.currentPopup?.form}
				dispatch={dispatch}
			/>
		</>
	);
}
