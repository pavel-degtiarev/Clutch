import React, { createContext, ReactNode, useCallback, useReducer } from "react";
import { TargetFormState } from "../../HOC/with-validate-submit/with-validate-submit";
import updateForm from "./form-state-actions";
import { formsInitState, formStateReducer } from "./form-state-reducer";
import { FormValuesState } from "./form-state-types";

type UpdateFormAction = (data: TargetFormState) => void;

interface FormStateContext extends FormValuesState {
  updateFuelForm: UpdateFormAction;
	updateServiceForm: UpdateFormAction;
	updateSpareForm: UpdateFormAction;
	updateOtherForm: UpdateFormAction;
}

interface FormStateProps {
  children: ReactNode;
}

export const FormStateContext = createContext<FormStateContext>({} as FormStateContext);

export default function FormState({ children }: FormStateProps) {
	const [state, dispatch] = useReducer(formStateReducer, formsInitState);

	const updateFuelForm = useCallback(
		(data: TargetFormState) => dispatch(updateForm("fuelState", data)), [] );

	const updateServiceForm = useCallback(
		(data: TargetFormState) => dispatch(updateForm("serviceState", data)), [] );

	const updateSpareForm = useCallback(
		(data: TargetFormState) => dispatch(updateForm("spareState", data)), [] );

	const updateOtherForm = useCallback(
		(data: TargetFormState) => dispatch(updateForm("otherState", data)), [] );

	return (
		<FormStateContext.Provider
			value={{
				...state,
				updateFuelForm,
				updateServiceForm,
				updateSpareForm,
				updateOtherForm,
			}}>
			{children}
		</FormStateContext.Provider>
	);
}
