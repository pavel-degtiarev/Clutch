import React, { useContext, useRef, useState } from "react";
import Field from "../../components/field/field";
import Button from "../../components/button/button";
import ButtonIcon from "../../components/button-icon/button-icon";
import Checkbox from "../../components/checkbox/checkbox";
import { collectFormFields } from "../../utilities/collect-form-fields";
import { popupClosed } from "../../components/popup-switch/popup-switch-actions";
import { FormComponentProps, setStateFunction } from "../../HOC/with-validate-submit/with-validate-submit";
import { DispatchContext } from "../../components/popup-switch/popup-switch";
import { FieldSuffixes } from "../../../global.var";
import dayjs from "dayjs";

import styles from "./form-service.module.scss";
import containerStyles from "../../components/popup-container/popup-container.module.scss";

const ServiceFormInitState = {
	date: dayjs().format("YYYY-MM-DD"),
	description: "",
	run: "",
  total: "",
  repeat:false,
};

export type ServiceFormState = typeof ServiceFormInitState;
export type ServiceFormFields = keyof ServiceFormState;

export default function FormService({
  validate, submit }: FormComponentProps<ServiceFormFields, ServiceFormState>) {
  
  const [formState, setFormState] = useState<ServiceFormState>(ServiceFormInitState);
  const formRef = useRef({} as HTMLFormElement);
	const dispatch = useContext(DispatchContext);
  
	return (
		<>
			<div className={containerStyles.popupContent}>
				<form
					className={containerStyles.form}
					ref={formRef}
					onChange={(e) => {
						const name = (e.target as HTMLInputElement).name as ServiceFormFields;
						const value = (e.target as HTMLInputElement).value;
						validate(name, value, setFormState as setStateFunction<ServiceFormState>);
					}}>
					<div className={styles.serviceFields}>
						<Field name="date" label="Дата" type="date" value={formState.date} />
						<Field name="description" label="Описание" value={formState.description} />
						<Field name="run" label="Пробег" suffix={FieldSuffixes.RUN} value={formState.run} numeric />

						<Field name="total" label="Общая сумма" suffix={FieldSuffixes.MONEY}
							auxStyles={styles.total} value={formState.total} numeric>
							<ButtonIcon
								auxClassNames={styles.totalDetails}
								handler={() => console.log("details")}
							/>
						</Field>

						<Checkbox name="repeat" auxStyles={styles.repeat} label="Повторять периодически"
							isChecked={formState.repeat}>
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
		</>
	);
}
