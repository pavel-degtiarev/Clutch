import React, { useContext, useRef, useState } from "react";
import { DispatchContext } from "../../components/popup-switch/popup-switch";
import Field from "../../components/field/field";
import Button from "../../components/button/button";
import { popupClosed } from "../../components/popup-switch/popup-switch-actions";
import { FieldSuffixes } from "../../../global.var";
import { collectFormFields } from "../../utilities/collect-form-fields";
import dayjs from "dayjs";
import { FormComponentProps, setStateFunction } from "../../HOC/with-validate-submit/with-validate-submit";

import styles from "./form-other.module.scss";
import containerStyles from "../../components/popup-container/popup-container.module.scss";

// =========================================

const otherFormInitState = {
	date: dayjs().format("YYYY-MM-DD"),
	title: "",
	price: "",
};

export type OtherFormState = typeof otherFormInitState
export type OtherFormFields = keyof OtherFormState;

// ==========================================

export default function FormOther(
	{ validate, submit }: FormComponentProps<OtherFormFields, OtherFormState>) {
	const [formState, setFormState] = useState<OtherFormState>(otherFormInitState);
	const formRef = useRef({} as HTMLFormElement);
	const dispatch = useContext(DispatchContext);

	return (
		<>
			<div className={containerStyles.popupContent}>
				<form
					className={containerStyles.form}
					ref={formRef}
					onChange={(e) => {
						const name = (e.target as HTMLInputElement).name as OtherFormFields;
						const value = (e.target as HTMLInputElement).value;
						validate(name, value, setFormState as setStateFunction<OtherFormState>);
					}}>
					<div className={styles.otherFields}>
						<Field name="date" label="Дата" type="date" value={formState.date} />
						<Field name="title" label="Наименование" value={formState.title} />
						<Field name="price" label="Цена" units={FieldSuffixes.MONEY}
							value={formState.price} numeric />
					</div>
				</form>
			</div>

			<Button title="Сохранить" auxStyles={containerStyles.saveButton}
				clickHandler={() => {
					if (submit(collectFormFields<OtherFormFields>(formRef.current))) {
						dispatch(popupClosed());
					}
				}}
			/>
		</>
	);
}
