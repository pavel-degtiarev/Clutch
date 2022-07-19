import React, { useContext, useState } from "react";
import Button from "../../components/button/button";
import FieldDate from "../../components/field/field-date";
import FieldText from "../../components/field/field-text";
import FieldWithSuffix from "../../components/field/field-with-suffix";
import InputNumeric from "../../components/field/input/input-numeric";

import { FormDisplayContext } from "../../context/form-display/form-display-state";
import { FieldSuffixes } from "../../general/global.var";
import { FormComponentProps, setStateFunction } from "../../HOC/with-validate-submit/with-validate-submit";
import { FormStateContext } from "../../context/form-state/form-state";

import styles from "./form-other.module.scss";
import containerStyles from "../../components/popup-container/popup-container.module.scss";
import Validated from "../../HOC/validated/validated";
import { OtherFormFields, OtherFormState } from "../../context/form-state/form-init-states";

// ==========================================

export default function FormOther({ getValidate, submit 
}: FormComponentProps<OtherFormFields, OtherFormState>) {
	
	const { otherState, updateOtherForm } = useContext(FormStateContext);
	const [formState, setFormState] = useState<OtherFormState>(otherState);
	const {closeForm} = useContext(FormDisplayContext);

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
				clickHandler={async () => {
					if (await submit(formState)) {
						updateOtherForm(formState);
						closeForm();
					}
				}}
			/>
		</>
	);
}
