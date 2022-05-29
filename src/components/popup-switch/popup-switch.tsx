import React, { useReducer } from "react";
import ButtonRollup from "../../modules/button-rollup/button-rollup";
import { RollupItem } from "../../modules/button-rollup/rollup";
import PopupContainer from "../popup-container/popup-container";
import { initState, reducer } from "./popup-switch-reducer";

// ==================================================

type PopupSwitchProps = {
	forms: RollupItem[];
};

export default function PopupSwitch({ forms }: PopupSwitchProps) {
  const [state, dispatch] = useReducer(reducer, initState);
  console.log(state);
  
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
				title={state.currentPopup.title}
				form={state.currentPopup.form}
				dispatch={dispatch}
			/>
		</>
	);
}
