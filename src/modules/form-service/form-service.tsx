import React, { useCallback, useContext, useRef, useState } from "react";
import FieldDate from "../../components/field/field-date";
import FieldText from "../../components/field/field-text";
import FieldWithSuffix from "../../components/field/field-with-suffix";
import InputNumeric from "../../components/field/input/input-numeric";
import Button from "../../components/button/button";
import ButtonIcon from "../../components/button-icon/button-icon";
import Checkbox from "../../components/checkbox/checkbox";
import Validated from "../../HOC/validated/validated";

import { collectFormFields } from "../../utilities/collect-form-fields";
import { formClosed, subformSelected } from "../../components/popup-switch/popup-switch-actions";
import {
	FormComponentProps,
	setStateFunction,
} from "../../HOC/with-validate-submit/with-validate-submit";
import { DispatchContext } from "../../components/popup-switch/popup-switch";
import { FieldSuffixes } from "../../../global.var";
import dayjs from "dayjs";

import styles from "./form-service.module.scss";
import containerStyles from "../../components/popup-container/popup-container.module.scss";
import { subforms } from "../../app";
import { FormItem } from "../../components/popup-switch/popup-switch.types";

// ==============================================

const ServiceFormInitState = {
	serviceDate: dayjs().format("YYYY-MM-DD"),
	serviceDescription: "",
	serviceRun: "",
	serviceTotal: "",
	serviceRepeat: false,
};

export type ServiceFormState = typeof ServiceFormInitState;
export type ServiceFormFields = keyof ServiceFormState;

export default function FormService({ getValidate, submit
}: FormComponentProps<ServiceFormFields, ServiceFormState>) {
	
	const [formState, setFormState] = useState<ServiceFormState>(ServiceFormInitState);
	const formRef = useRef({} as HTMLFormElement);
	const dispatch = useContext(DispatchContext);

	const showSubform = useCallback(
		(subform: FormItem, value = true) => {
			if (value === true) dispatch(subformSelected(subform));
			return value;
		}, [dispatch]
	);

	const validate = getValidate(setFormState as setStateFunction<ServiceFormState>);

	return (
		<>
			<div className={containerStyles.popupContent}>
				<form className={containerStyles.form} ref={formRef}>
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
										handler={() => showSubform(subforms.detailsSubform)}
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
									changeHandler={(isChecked) => showSubform(subforms.repeatSubform, isChecked)}>
									<ButtonIcon
										auxClassNames={styles.repeatDetails}
										handler={() => showSubform(subforms.repeatSubform)}
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
				clickHandler={() => {
					if (submit(collectFormFields<ServiceFormFields>(formRef.current))) {
						dispatch(formClosed());
					}
				}}
			/>
		</>
	);
}
