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
import { FormUnits, TimelUnit } from "../../../global.var";
import Button from "../../components/button/button";
import { collectFormFields } from "../../utilities/collect-form-fields";

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
	validate,
	submit,
}: FormComponentProps<ServiceRepeatFormFields, ServiceRepeatFormState>) {
	const [formState, setFormState] = useState<ServiceRepeatFormState>(ServiceRepeatFormInitState);
	const formRef = useRef({} as HTMLFormElement);

	return (
		<>
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
							<Checkbox name="repeat-by-run" label="по пробегу"
								isChecked={formState.repeatByRun}
								callback={() =>
									setFormState((prevState) => {
										return { ...prevState, repeatByRun: !prevState.repeatByRun };
									})
								}
							/>
							<Field name="repeated-run" label="Пробег"
								value={formState.run} numeric units={FormUnits.RUN}
								disabled={!formState.repeatByRun}
							/>
						</FieldGroup>

						<FieldGroup>
							<Checkbox name="repeat-by-time" label="по времени"
								isChecked={formState.repeatByTime}
								callback={() =>
									setFormState((prevState) => {
										return { ...prevState, repeatByTime: !prevState.repeatByTime };
									})
								}
							/>

							<FieldGroup horizontal>
								<Field name="repeated-time" label="Время"
									value={formState.run}
									disabled={!formState.repeatByTime}
								/>
								<Select name="repeat-time-slot" options={timeSlotOptions}
									selected={timeSlotOptions[1]}
									disabled={!formState.repeatByTime}
								/>
							</FieldGroup>
						</FieldGroup>
					</div>
				</form>
			</div>

			<Button
				title="Сохранить"
				auxStyles={containerStyles.saveButton}
				clickHandler={() => {
					if (submit(collectFormFields<ServiceRepeatFormFields>(formRef.current))) {
						// dispatch(popupClosed());
					}
				}}
			/>
		</>
	);
}
