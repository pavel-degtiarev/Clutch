import React, { useContext, useRef, useState } from "react";
import { DispatchContext } from "../../components/popup-switch/popup-switch";
import Field from "../../components/field/field";
import Button from "../../components/button/button";
import { popupClosed } from "../../components/popup-switch/popup-switch-actions";
import { FormUnits } from "../../../global.var";
import { collectFormFields } from "../../utilities/collect-form-fields";
import dayjs from "dayjs";

import styles from "./form-spare.module.scss";
import containerStyles from "../../components/popup-container/popup-container.module.scss";

// =========================================

const spareFormInitState = {
	date: dayjs().format("YYYY-MM-DD"),
	title: "",
	price: "",
};

export type SpareFormState = typeof spareFormInitState
export type SpareFormFields = keyof SpareFormState;

// ==========================================

export default function FormSpare() {
	const [formState, setFormState] = useState(spareFormInitState);
	const formRef = useRef({} as HTMLFormElement);
	const dispatch = useContext(DispatchContext);

	function validateForm(target: SpareFormFields, value: string) {}

	function submitForm(formFields: FormFields<SpareFormFields>): boolean {
		console.log("Send FormSpare data to API", formFields);
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
							(e.target as HTMLInputElement).name as SpareFormFields,
							(e.target as HTMLInputElement).value
						)
					}>
					<div className={styles.spareFields}>
						<Field
							name="date" label="Дата" type="date"
							value={formState.date}
						/>

						<Field
							name="title" label="Наименование"
							value={formState.title}
						/>

						<Field
							name="price"
							label="Цена"
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
					if (submitForm(collectFormFields<SpareFormFields>(formRef.current))) {
						dispatch(popupClosed());
					}
				}}
			/>
		</>
	);
}
