import React, { createContext, ReactNode, useCallback, useReducer } from "react";
import { formClosed, formSelected, rollupToggled, subformClosed, subformSelected,
  } from "./form-display-actions";
import { formDisplayInitState, formDisplayReducer } from "./form-display-reducer";
import { FormItem, PopupState } from "./form-display-types";

export type FormDisplayAction =() => void;
export type FormDisplayActionWithPayload = (form: FormItem) => void;

interface FormDisplayContext {
  state: PopupState;
  toggleRollup: FormDisplayAction;
  showForm: FormDisplayActionWithPayload;
  showSubform: FormDisplayActionWithPayload;
  closeForm: FormDisplayAction;
  closeSubform: FormDisplayAction;
}

export const FormDisplayContext = createContext<FormDisplayContext>({} as FormDisplayContext);

interface FormDisplayStateProps {
  children: ReactNode;
}

export default function FormDisplayState({ children }: FormDisplayStateProps) {
  const [state, dispatch] = useReducer(formDisplayReducer, formDisplayInitState);

  const toggleRollup = () => dispatch(rollupToggled());
  const showForm = (form: FormItem) => dispatch(formSelected(form));
  const showSubform = (subform: FormItem) => dispatch(subformSelected(subform));
  const closeForm = () => dispatch(formClosed());
  const closeSubform = () => dispatch(subformClosed());

  return (
    <FormDisplayContext.Provider
      value={{ state, toggleRollup, showForm, showSubform, closeForm, closeSubform }}>
      {children}
    </FormDisplayContext.Provider>
  );
}
