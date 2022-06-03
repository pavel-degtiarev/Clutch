import React, { useContext, useRef, useState } from "react";
import { DispatchContext } from "../../components/popup-switch/popup-switch";
import Field from "../../components/field/field";
import Button from "../../components/button/button";
import { popupClosed } from "../../components/popup-switch/popup-switch-actions";
import { FormUnits } from "../../../global.var";
import { collectFormFields } from "../../utilities/collect-form-fields";
import dayjs from "dayjs";

import styles from "./form-other.module.scss";
import containerStyles from "../../components/popup-container/popup-container.module.scss";

// =========================================

const otherFormInitState = {
	date: dayjs().format("YYYY-MM-DD"),
	title: "",
	price: "",
};

type OtherFormFields = keyof typeof otherFormInitState;

// ==========================================

export default function FormOther() {
	const [formState, setFormState] = useState(otherFormInitState);
	const formRef = useRef({} as HTMLFormElement);
	const dispatch = useContext(DispatchContext);

	function validateForm(target: OtherFormFields, value: string) {}

	function submitForm(formFields: FormFields<OtherFormFields>): boolean {
		console.log("Send FormOther data to API", formFields);
		return true;
	}
	
	return (
		<>
			<div className={containerStyles.popupContent}>
				<form
					className={containerStyles.form}
					ref={formRef}
					onChange={(e) =>
						validateForm(
							(e.target as HTMLInputElement).name as OtherFormFields,
							(e.target as HTMLInputElement).value
						)
					}>
					<div className={styles.otherFields}>
						<Field
							name="date" label="Дата" type="date"
							value={formState.date}
						/>

						<Field
							name="title" label="Наименование"
							value={formState.title}
						/>

						<Field
							name="price" label="Цена"
							units={FormUnits.MONEY}
							value={formState.price}
							numeric
						/>
					</div>
				</form>
			</div>

			<Button
				title="Сохранить"
				auxStyles={containerStyles.saveButton}
				clickHandler={() => {
					if (submitForm(collectFormFields<OtherFormFields>(formRef.current))) {
						dispatch(popupClosed());
					}
				}}
			/>
		</>
	);
}
