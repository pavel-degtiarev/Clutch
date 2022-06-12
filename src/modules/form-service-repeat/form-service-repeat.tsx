import React, { useEffect, useRef, useState } from "react";
import {
	FormComponentProps,
	setStateFunction,
	TargetFormFields,
	ValidateContext,
	ValidateFunction,
} from "../../HOC/with-validate-submit/with-validate-submit";
import Checkbox from "../../components/checkbox/checkbox";
import FieldGroup from "../../components/field-group/field-group";
import Select from "../../components/select/select";
import { FieldSuffixes, TimeSuffixes, TimeUnits } from "../../../global.var";
import Button from "../../components/button/button";
import { collectFormFields } from "../../utilities/collect-form-fields";
import FieldWithSuffix from "../../components/field/field-with-suffix";

import styles from "./form-service-repeat.module.scss";
import containerStyles from "../../components/popup-container/popup-container.module.scss";
import InputNumeric from "../../components/field/input-numeric";

const timeSlotOptions = [
	{
		label: "дни",
		value: TimeUnits.DAYS,
	},
	{
		label: "месяцы",
		value: TimeUnits.MONTHS,
	},
	{
		label: "годы",
		value: TimeUnits.YEARS,
	},
];

const ServiceRepeatFormInitState = {
	repeatingRun: "",
	repeatingTime: "",
	repeatByRun: false,
	repeatByTime: false,
};

export type ServiceRepeatFormState = typeof ServiceRepeatFormInitState;
export type ServiceRepeatFormFields = keyof ServiceRepeatFormState;

export default function FormServiceRepeat({ getValidate, submit }: FormComponentProps<ServiceRepeatFormFields, ServiceRepeatFormState>) {

	const [formState, setFormState] = useState<ServiceRepeatFormState>(ServiceRepeatFormInitState);
	const formRef = useRef({} as HTMLFormElement);

	const validate = getValidate(setFormState as setStateFunction<ServiceRepeatFormState>);

	return (
		<ValidateContext.Provider value={validate as ValidateFunction<TargetFormFields>}>

			<div className={containerStyles.popupContent}>
				<form className={containerStyles.form} ref={formRef} >
					<div className={styles.serviceRepeatFields}>
						<FieldGroup>
							<Checkbox
								name="repeatByRun" label="по пробегу" isChecked={formState.repeatByRun}
								callback={() =>
									setFormState((prevState) => {
										return { ...prevState, repeatByRun: !prevState.repeatByRun };
									})
								}
							/>
							<FieldWithSuffix InputComponent={InputNumeric}
								name="repeatingRun" label="Пробег" value={formState.repeatingRun}
								suffix={FieldSuffixes.RUN}
								disabled={!formState.repeatByRun}
							/>
						</FieldGroup>

						<FieldGroup>
							<Checkbox
								name="repeatByTime" label="по времени" isChecked={formState.repeatByTime}
								callback={() =>
									setFormState((prevState) => {
										return { ...prevState, repeatByTime: !prevState.repeatByTime };
									})
								}
							/>
							<FieldGroup horizontal>
								<FieldWithSuffix InputComponent={InputNumeric}
									name="repeatingTime" label="Время" value={formState.repeatingTime}
									disabled={!formState.repeatByTime} suffix={TimeSuffixes.MANY_MONTHS} />
								<Select
									name="repeatTimeSlot" options={timeSlotOptions} selected={timeSlotOptions[1]}
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
		</ValidateContext.Provider>
	);
}
