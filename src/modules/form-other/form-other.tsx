import React, { useContext, useRef, useState } from "react";
import { DispatchContext } from "../../components/popup-switch/popup-switch";
import Button from "../../components/button/button";
import { popupClosed } from "../../components/popup-switch/popup-switch-actions";
import { FieldSuffixes } from "../../../global.var";
import { collectFormFields } from "../../utilities/collect-form-fields";
import dayjs from "dayjs";
import { FormComponentProps, setStateFunction, TargetFormFields, ValidateContext, ValidateFunction } from "../../HOC/with-validate-submit/with-validate-submit";

import styles from "./form-other.module.scss";
import containerStyles from "../../components/popup-container/popup-container.module.scss";
import FieldDate from "../../components/field/field-date";
import FieldText from "../../components/field/field-text";
import FieldWithSuffix from "../../components/field/field-with-suffix";
import InputNumeric from "../../components/field/input-numeric";

// =========================================

const otherFormInitState = {
	otherDate: dayjs().format("YYYY-MM-DD"),
	otherTitle: "",
	otherPrice: "",
};

export type OtherFormState = typeof otherFormInitState
export type OtherFormFields = keyof OtherFormState;

// ==========================================

export default function FormOther(
	{ getValidate, submit }: FormComponentProps<OtherFormFields, OtherFormState>) {
	const [formState, setFormState] = useState<OtherFormState>(otherFormInitState);
	const formRef = useRef({} as HTMLFormElement);
	const dispatch = useContext(DispatchContext);

	const validate = getValidate(setFormState as setStateFunction<OtherFormState>);

	return (
		<ValidateContext.Provider value={validate as ValidateFunction<TargetFormFields>}>
			<div className={containerStyles.popupContent}>
				<form className={containerStyles.form} ref={formRef}>
					<div className={styles.otherFields}>
						<FieldDate name="otherDate" label="Дата" value={formState.otherDate} />
						<FieldText name="otherTitle" label="Наименование" value={formState.otherTitle} />
						<FieldWithSuffix InputComponent={InputNumeric}
							name="otherPrice" label="Цена"
							value={formState.otherPrice}
							suffix={FieldSuffixes.MONEY}
						/>
					</div>
				</form>
			</div>

			<Button
				title="Сохранить"
				auxStyles={containerStyles.saveButton}
				clickHandler={() => {
					if (submit(collectFormFields<OtherFormFields>(formRef.current))) {
						dispatch(popupClosed());
					}
				}}
			/>
		</ValidateContext.Provider>
	);
}
