import React, { useContext, useRef, useState } from "react";
import Field from "../../components/field/field";
import Button from "../../components/button/button";
import ButtonIcon from "../../components/button-icon/button-icon";
import Checkbox from "../../components/checkbox/checkbox";
import { collectFormFields } from "../../utilities/collect-form-fields";
import { popupClosed } from "../../components/popup-switch/popup-switch-actions";
import {
	FormComponentProps,
	setStateFunction,
	TargetFormFields,
	ValidateContext,
	ValidateFunction,
} from "../../HOC/with-validate-submit/with-validate-submit";
import { DispatchContext } from "../../components/popup-switch/popup-switch";
import { FieldSuffixes } from "../../../global.var";
import dayjs from "dayjs";

import styles from "./form-service.module.scss";
import containerStyles from "../../components/popup-container/popup-container.module.scss";
import FieldDate from "../../components/field/field-date";
import FieldText from "../../components/field/field-text";
import FieldWithSuffix from "../../components/field/field-with-suffix";
import InputNumeric from "../../components/field/input-numeric";

const ServiceFormInitState = {
	serviceDate: dayjs().format("YYYY-MM-DD"),
	serviceDescription: "",
	serviceRun: "",
	serviceTotal: "",
	serviceRepeat: false,
};

export type ServiceFormState = typeof ServiceFormInitState;
export type ServiceFormFields = keyof ServiceFormState;

export default function FormService({
	getValidate: getValidate,
	submit,
}: FormComponentProps<ServiceFormFields, ServiceFormState>) {
	const [formState, setFormState] = useState<ServiceFormState>(ServiceFormInitState);
	const formRef = useRef({} as HTMLFormElement);
	const dispatch = useContext(DispatchContext);

	const validate = getValidate(setFormState as setStateFunction<ServiceFormState>);

	return (
		<ValidateContext.Provider value={validate as ValidateFunction<TargetFormFields>}>
			<div className={containerStyles.popupContent}>
				<form className={containerStyles.form} ref={formRef}>
					<div className={styles.serviceFields}>
						<FieldDate name="serviceDate" label="Дата" value={formState.serviceDate} />
						<FieldText name="serviceDescription" label="Описание"
							value={formState.serviceDescription}
						/>

						<FieldWithSuffix InputComponent={InputNumeric}
							name="serviceRun" label="Пробег"
							value={formState.serviceRun} suffix={FieldSuffixes.RUN}
						/>

						<FieldWithSuffix InputComponent={InputNumeric}
							name="serviceTotal" label="Общая сумма"
							value={formState.serviceTotal} suffix={FieldSuffixes.MONEY}
							auxStyles={styles.total}>
							<ButtonIcon
								auxClassNames={styles.totalDetails}
								handler={() => console.log("details")}
							/>
						</FieldWithSuffix>

						<Checkbox name="serviceRepeat"
							label="Повторять периодически" isChecked={formState.serviceRepeat}
							auxStyles={styles.repeat}>
							<ButtonIcon
								auxClassNames={styles.repeatDetails}
								handler={() => console.log("repeat")}
							/>
						</Checkbox>
					</div>
				</form>
			</div>

			<Button
				title="Сохранить"
				auxStyles={containerStyles.saveButton}
				clickHandler={() => {
					if (submit(collectFormFields<ServiceFormFields>(formRef.current))) {
						dispatch(popupClosed());
					}
				}}
			/>
		</ValidateContext.Provider>
	);
}
