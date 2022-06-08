import React, { useContext, useRef, useState } from "react";
import { DispatchContext } from "../../components/popup-switch/popup-switch";
import Field from "../../components/field/field";
import Button from "../../components/button/button";
import { popupClosed } from "../../components/popup-switch/popup-switch-actions";
import { FieldSuffixes } from "../../../global.var";
import { collectFormFields } from "../../utilities/collect-form-fields";
import { FormComponentProps, setStateFunction } from "../../HOC/with-validate-submit/with-validate-submit";
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

export default function FormSpare({ validate, submit}:FormComponentProps<SpareFormFields, SpareFormState>) {
	const [formState, setFormState] = useState<SpareFormState>(spareFormInitState);
	const formRef = useRef({} as HTMLFormElement);
	const dispatch = useContext(DispatchContext);

	return (
		<>
			<div className={containerStyles.popupContent}>
				<form
					className={containerStyles.form}
					ref={formRef}
					onChange={(e) => {
						const name = (e.target as HTMLInputElement).name as SpareFormFields;
						const value = (e.target as HTMLInputElement).value;
						validate(name, value, setFormState as setStateFunction<SpareFormState>);
					}}>
					<div className={styles.spareFields}>
						<Field name="date" label="Дата" type="date" value={formState.date} />
						<Field name="title" label="Наименование" value={formState.title} />
						<Field name="price" label="Цена" suffix={FieldSuffixes.MONEY}
							value={formState.price} numeric />
					</div>
				</form>
			</div>

			<Button
				title="Сохранить"
				auxStyles={containerStyles.saveButton}
				clickHandler={() => {
					if (submit(collectFormFields<SpareFormFields>(formRef.current))) {
						dispatch(popupClosed());
					}
				}}
			/>
		</>
	);
}
