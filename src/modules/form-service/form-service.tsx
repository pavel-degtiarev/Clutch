import React, { useCallback, useContext, useState } from "react";
import FieldDate from "../../components/field/field-date";
import FieldText from "../../components/field/field-text";
import FieldWithSuffix from "../../components/field/field-with-suffix";
import InputNumeric from "../../components/field/input/input-numeric";
import Button from "../../components/button/button";
import ButtonIcon from "../../components/button-icon/button-icon";
import Checkbox from "../../components/checkbox/checkbox";
import Validated from "../../HOC/validated/validated";

import { FormDisplayContext } from "../../context/form-display/form-display-state";
import { FormComponentProps, setStateFunction } from "../../HOC/with-validate-submit/with-validate-submit";
import { ServiceFormFields, ServiceFormState } from "../../store/form-init-states";
import { FormItem } from "../../context/form-display/form-display-types";
import { subforms } from "../../general/forms";
import { FieldSuffixes } from "../../general/global.var";

import styles from "./form-service.module.scss";
import containerStyles from "../../components/popup-container/popup-container.module.scss";

// ==============================================

export default function FormService({ getValidate, submit, initState
}: FormComponentProps<ServiceFormFields, ServiceFormState>) {
	
	const [formState, setFormState] = useState<ServiceFormState>(initState);
	const {showSubform, closeForm} = useContext(FormDisplayContext);

	const useShowSubform = useCallback(
		(subform: FormItem, value = true) => {
			if (value === true) showSubform(subform);
			return value;
		},
		[showSubform]
	);

	const validate = getValidate(setFormState as setStateFunction<ServiceFormState>);

	return (
		<>
			<div className={containerStyles.popupContent}>
				<form className={containerStyles.form}>
					<div className={styles.serviceFields}>
						<Validated<ServiceFormFields>
							validate={validate}
							Control={<FieldDate name="serviceDate" label="Дата" value={formState.serviceDate} />}
						/>

						<Validated<ServiceFormFields>
							validate={validate}
							Control={
								<FieldText
									name="serviceDescription"
									label="Описание"
									value={formState.serviceDescription}
								/>
							}
						/>

						<Validated<ServiceFormFields>
							validate={validate}
							Control={
								<FieldWithSuffix
									InputComponent={InputNumeric}
									name="serviceRun"
									label="Пробег"
									value={formState.serviceRun}
									suffix={FieldSuffixes.RUN}
								/>
							}
						/>

						<Validated<ServiceFormFields>
							validate={validate}
							Control={
								<FieldWithSuffix
									InputComponent={InputNumeric}
									name="serviceTotal"
									label="Общая сумма"
									value={formState.serviceTotal}
									suffix={FieldSuffixes.MONEY}
									auxStyles={styles.total}>
									<ButtonIcon
										auxClassNames={styles.totalDetails}
										handler={() => useShowSubform(subforms.detailsSubform)}
									/>
								</FieldWithSuffix>
							}
						/>

						<Validated<ServiceFormFields>
							validate={validate}
							Control={
								<Checkbox
									name="serviceRepeat"
									label="Повторять периодически"
									isChecked={formState.serviceRepeat}
									auxStyles={styles.repeat}
									changeHandler={(isChecked) => useShowSubform(subforms.repeatSubform, isChecked)}>
									<ButtonIcon
										auxClassNames={styles.repeatDetails}
										handler={() => useShowSubform(subforms.repeatSubform)}
										disabled={!formState.serviceRepeat}
									/>
								</Checkbox>
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
						closeForm();
					}
				}}
			/>
		</>
	);
}
