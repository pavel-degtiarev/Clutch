import React, { createContext, Dispatch, useReducer } from "react";
import ButtonRollup from "../../modules/button-rollup/button-rollup";
import PopupContainer from "../popup-container/popup-container";
import { formClosed, subformClosed } from "./popup-switch-actions";
import { initState, reducer } from "./popup-switch-reducer";
import { Action, FormItem } from "./popup-switch.types";

type PopupSwitchProps = {
	forms: FormItem[];
};

export const DispatchContext = createContext<Dispatch<Action>>(() => {});

export default function PopupSwitch({ forms }: PopupSwitchProps) {
	const [state, dispatch] = useReducer(reducer, initState);
	const subformOpened = !!state.currentSubform;

	return (
		<DispatchContext.Provider value={dispatch}>

			<ButtonRollup
				title="Потратить деньги"
				forms={forms}
				rollupOpened={state.rollupOpened}
			/>

			<PopupContainer
				title={state.currentForm?.title}
				form={state.currentForm?.form}
				inactive={subformOpened}
				closeAction={formClosed}
			/>

			<PopupContainer
				title={state.currentSubform?.title}
				form={state.currentSubform?.form}
				closeAction={subformClosed}
				small
			/>

		</DispatchContext.Provider>
	);
}
