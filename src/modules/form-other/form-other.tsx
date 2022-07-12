import React, { useContext, useRef, useState } from "react";
import Button from "../../components/button/button";
import FieldDate from "../../components/field/field-date";
import FieldText from "../../components/field/field-text";
import FieldWithSuffix from "../../components/field/field-with-suffix";
import InputNumeric from "../../components/field/input/input-numeric";

import { DispatchContext } from "../../components/popup-switch/popup-switch";
import { formClosed } from "../../components/popup-switch/popup-switch-actions";
import { FieldSuffixes } from "../../../global.var";
import {
	FormComponentProps,
	setStateFunction,
} from "../../HOC/with-validate-submit/with-validate-submit";
import dayjs from "dayjs";

import styles from "./form-other.module.scss";
import containerStyles from "../../components/popup-container/popup-container.module.scss";
import Validated from "../../HOC/validated/validated";

// =========================================

const otherFormInitState = {
	otherDate: dayjs().format("YYYY-MM-DD"),
	otherTitle: "",
	otherPrice: "",
};

export type OtherFormState = typeof otherFormInitState;
export type OtherFormFields = keyof OtherFormState;

// ==========================================

export default function FormOther({
	getValidate,
	submit,
}: FormComponentProps<OtherFormFields, OtherFormState>) {
	const [formState, setFormState] = useState<OtherFormState>(otherFormInitState);
	const dispatch = useContext(DispatchContext);

	const validate = getValidate(setFormState as setStateFunction<OtherFormState>);

	return (
		<>
			<div className={containerStyles.popupContent}>
				<form className={containerStyles.form}>
					<div className={styles.otherFields}>
						
						<Validated<OtherFormFields>
							validate={validate}
							Control={<FieldDate name="otherDate" label="Дата" value={formState.otherDate} />}
						/>

						<Validated<OtherFormFields>
							validate={validate}
							Control={
								<FieldText name="otherTitle" label="Наименование" value={formState.otherTitle} />
							}
						/>

						<Validated<OtherFormFields>
							validate={validate}
							Control={
								<FieldWithSuffix
									InputComponent={InputNumeric}
									name="otherPrice"
									label="Цена"
									value={formState.otherPrice}
									suffix={FieldSuffixes.MONEY}
								/>
							}
						/>
					</div>
				</form>
			</div>

			<Button
				title="Сохранить"
				auxStyles={containerStyles.saveButton}
				clickHandler={() => {
					if (submit(formState)) {
						dispatch(formClosed());
					}
				}}
			/>
		</>
	);
}
