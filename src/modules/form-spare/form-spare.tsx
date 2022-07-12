import React, { useContext, useState } from "react";
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

import styles from "./form-spare.module.scss";
import containerStyles from "../../components/popup-container/popup-container.module.scss";
import Validated from "../../HOC/validated/validated";

// =========================================

const spareFormInitState = {
	spareDate: dayjs().format("YYYY-MM-DD"),
	spareTitle: "",
	sparePrice: "",
};

export type SpareFormState = typeof spareFormInitState;
export type SpareFormFields = keyof SpareFormState;

// ==========================================

export default function FormSpare({ getValidate, submit
}: FormComponentProps<SpareFormFields, SpareFormState>) {

	const [formState, setFormState] = useState<SpareFormState>(spareFormInitState);
	const dispatch = useContext(DispatchContext);

	const validate = getValidate(setFormState as setStateFunction<SpareFormState>);

	return (
		<>
			<div className={containerStyles.popupContent}>
				<form className={containerStyles.form}>
					<div className={styles.spareFields}>
						<Validated<SpareFormFields>
							validate={validate}
							Control={<FieldDate name="spareDate" label="Дата" value={formState.spareDate} />}
						/>

						<Validated<SpareFormFields>
							validate={validate}
							Control={
								<FieldText name="spareTitle" label="Наименование" value={formState.spareTitle} />
							}
						/>

						<Validated<SpareFormFields>
							validate={validate}
							Control={
								<FieldWithSuffix
									InputComponent={InputNumeric}
									name="sparePrice"
									label="Цена"
									value={formState.sparePrice}
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
