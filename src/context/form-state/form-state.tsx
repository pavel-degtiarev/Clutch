import React, { createContext, ReactNode, useReducer } from "react";
import { TargetFormState } from "../../HOC/with-validate-check/with-validate-check";
import updateForm from "./form-state-actions";
import { formsInitState, formStateReducer } from "./form-state-reducer";
import { FormValuesState } from "./form-state-types";

export type UpdateFormAction = (data: TargetFormState) => void;

interface FormStateContext extends FormValuesState {
  updateFuelForm: UpdateFormAction;
  updateServiceForm: UpdateFormAction;
  updateSpareForm: UpdateFormAction;
  updateOtherForm: UpdateFormAction;
  updateRepeatForm: UpdateFormAction;
  updateDetailsForm: UpdateFormAction;
}

interface FormStateProps {
  children: ReactNode;
}

export const FormStateContext = createContext<FormStateContext>({} as FormStateContext);

export default function FormState({ children }: FormStateProps) {
  const [state, dispatch] = useReducer(formStateReducer, formsInitState);

  const updateFuelForm = (data: TargetFormState) => dispatch(updateForm("fuelState", data));
  const updateServiceForm = (data: TargetFormState) => dispatch(updateForm("serviceState", data));
  const updateSpareForm = (data: TargetFormState) => dispatch(updateForm("spareState", data));
  const updateOtherForm = (data: TargetFormState) => dispatch(updateForm("otherState", data));
  const updateRepeatForm = (data: TargetFormState) => dispatch(updateForm("repeatState", data));
  const updateDetailsForm = (data: TargetFormState) => dispatch(updateForm("detailsState", data));

  return (
    <FormStateContext.Provider
      value={{
        ...state,
        updateFuelForm,
        updateServiceForm,
        updateSpareForm,
        updateOtherForm,
        updateRepeatForm,
        updateDetailsForm,
      }}>
      {children}
    </FormStateContext.Provider>
  );
}
