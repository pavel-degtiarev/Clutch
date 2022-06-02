import React, { createContext, Dispatch, useReducer } from "react";
import ButtonRollup from "../../modules/button-rollup/button-rollup";
import PopupContainer from "../popup-container/popup-container";
import { initState, reducer } from "./popup-switch-reducer";
import { Action, FormItem } from "./popup-switch.types";

type PopupSwitchProps = {
	forms: FormItem[];
};

export const DispatchContext = createContext<Dispatch<Action>>(() => {});

export default function PopupSwitch({ forms }: PopupSwitchProps) {
	const [state, dispatch] = useReducer(reducer, initState);

	return (
		<>
			<DispatchContext.Provider value={dispatch}>
				<ButtonRollup
					title="Потратить деньги"
					forms={forms}
					rollupOpened={state.rollupOpened}
				/>
				<PopupContainer
					opened={state.popupOpened}
					title={state.currentPopup?.title}
					form={state.currentPopup?.form}
				/>
			</DispatchContext.Provider>
		</>
	);
}
