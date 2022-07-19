import React, { createContext, ReactNode, useCallback, useReducer } from "react";
import { PopupState } from "../../components/popup-switch/popup-switch.types";
import { formClosed, formSelected, rollupToggled, subformClosed, subformSelected,
  } from "./form-display-actions";
import { formDisplayInitState, formDisplayReducer } from "./form-display-reducer";
import { FormItem } from "./form-display-types";

type FormDisplayAction = ((form: FormItem) => void) | (() => void);

interface FormDisplayContext {
	state: PopupState;
	toggleRollup:FormDisplayAction;
	showForm:FormDisplayAction;
	showSubform:FormDisplayAction;
	closeForm:FormDisplayAction;
	closeSubform:FormDisplayAction;
}

export const FormDisplayContext = createContext<FormDisplayContext>({} as FormDisplayContext);

interface FormDisplayStateProps {
	children: ReactNode;
}

export default function FormDisplayState({ children }: FormDisplayStateProps) {
	const [state, dispatch] = useReducer(formDisplayReducer, formDisplayInitState);

	const toggleRollup = useCallback(() => dispatch(rollupToggled()), []);
	const showForm = useCallback((form: FormItem) => dispatch(formSelected(form)), []);
	const showSubform = useCallback((subform: FormItem) => dispatch(subformSelected(subform)), []);
	const closeForm = useCallback(() => dispatch(formClosed()), []);
	const closeSubform = useCallback(() => dispatch(subformClosed()), []);

	return (
		<FormDisplayContext.Provider
			value={{ state, toggleRollup, showForm, showSubform, closeForm, closeSubform }}>
			{children}
		</FormDisplayContext.Provider>
	);
}
