import React, { useRef, useState } from "react";
import {
	FormComponentProps,
	setStateFunction,
} from "../../HOC/with-validate-submit/with-validate-submit";

import styles from "./form-service-repeat.module.scss";
import containerStyles from "../../components/popup-container/popup-container.module.scss";
import Checkbox from "../../components/checkbox/checkbox";
import Field from "../../components/field/field";
import FieldGroup from "../../components/field-group/field-group";
import Select from "../../components/select/select";
import { TimelUnit } from "../../../global.var";

const timeSlotOptions = [
	{
		label: "дни",
		value: TimelUnit.DAYS,
	},
	{
		label: "месяцы",
		value: TimelUnit.MONTHS,
	},
	{
		label: "годы",
		value: TimelUnit.YEARS,
	},
];

const ServiceRepeatFormInitState = {
	run: "",
	repeatByRun: false,
	repeatByTime: false,
};

export type ServiceRepeatFormState = typeof ServiceRepeatFormInitState;
export type ServiceRepeatFormFields = keyof ServiceRepeatFormState;

export default function FormServiceRepeat({
  validate, submit }: FormComponentProps<ServiceRepeatFormFields, ServiceRepeatFormState>) {
  
	const [formState, setFormState] = useState<ServiceRepeatFormState>(ServiceRepeatFormInitState);
	const formRef = useRef({} as HTMLFormElement);

	return (
		<div className={containerStyles.popupContent}>
			<form
				className={containerStyles.form}
				ref={formRef}
				onChange={(e) => {
					const name = (e.target as HTMLInputElement).name as ServiceRepeatFormFields;
					const value = (e.target as HTMLInputElement).value;
					validate(name, value, setFormState as setStateFunction<ServiceRepeatFormState>);
				}}>
				<div className={styles.serviceRepeatFields}>
					<FieldGroup>
						<Checkbox name="repeat-by-run" label="по пробегу" isChecked={formState.repeatByRun} />
						<Field name="total" label="Пробег" value={formState.run} />
					</FieldGroup>

					<FieldGroup>
						<Checkbox name="repeat-by-time" label="по времени" isChecked={formState.repeatByTime} />

						<FieldGroup horizontal>
							<Field name="time-amount" label="Время" value={formState.run} />
							<Select name="time-slot" options={timeSlotOptions} selected={timeSlotOptions[1]} />
						</FieldGroup>
					</FieldGroup>
				</div>
			</form>
		</div>
	);
}
