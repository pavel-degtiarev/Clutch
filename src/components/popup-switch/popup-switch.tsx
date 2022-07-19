import React, { useContext } from "react";
import { FormDisplayContext } from "../../context/form-display/form-display-state";
import { FormItem } from "../../context/form-display/form-display-types";
import ButtonRollup from "../../modules/button-rollup/button-rollup";
import PopupContainer from "../popup-container/popup-container";

type PopupSwitchProps = {
	forms: FormItem[];
};

export default function PopupSwitch({ forms }: PopupSwitchProps) {
	const { state, closeForm, closeSubform } = useContext(FormDisplayContext);
	
	const subformOpened = !!state.currentSubform;

	return (
		<>
			<ButtonRollup
				title="Потратить деньги" forms={forms}
				rollupOpened={state.rollupOpened} />

			<PopupContainer
				title={state.currentForm?.title}
				form={state.currentForm?.form}
				inactive={subformOpened}
				closeAction={closeForm}
			/>

			<PopupContainer
				title={state.currentSubform?.title}
				form={state.currentSubform?.form}
				closeAction={closeSubform}
				small
			/>
		</>
	);
}
