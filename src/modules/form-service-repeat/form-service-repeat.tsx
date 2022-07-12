import React, { useState } from "react";
import {
	FormComponentProps,
	setStateFunction,
} from "../../HOC/with-validate-submit/with-validate-submit";
import Checkbox from "../../components/checkbox/checkbox";
import FieldGroup from "../../components/field-group/field-group";
import Select from "../../components/select/select";
import { FieldSuffixes, timeSlotOptions} from "../../../global.var";
import Button from "../../components/button/button";
import FieldWithSuffix from "../../components/field/field-with-suffix";
import Validated from "../../HOC/validated/validated";
import InputNumeric from "../../components/field/input/input-numeric";
import { getTimeSuffix } from "../../utilities/units";

import styles from "./form-service-repeat.module.scss";
import containerStyles from "../../components/popup-container/popup-container.module.scss";

// ===========================================

const ServiceRepeatFormInitState = {
	repeatingRun: "",
	repeatingTime: "",
	repeatByRun: false,
	repeatByTime: false,
	repeatTimeSlot: timeSlotOptions[1].value
};

export type ServiceRepeatFormState = typeof ServiceRepeatFormInitState;
export type ServiceRepeatFormFields = keyof ServiceRepeatFormState;

export default function FormServiceRepeat({ getValidate, submit,
}: FormComponentProps<ServiceRepeatFormFields, ServiceRepeatFormState>) {
	
	const [formState, setFormState] = useState<ServiceRepeatFormState>(ServiceRepeatFormInitState);
	const validate = getValidate(setFormState as setStateFunction<ServiceRepeatFormState>);

	return (
		<>
			<div className={containerStyles.popupContent}>
				<form className={containerStyles.form}>
					<div className={styles.serviceRepeatFields}>

						<FieldGroup>
							<Validated
								validate={validate}
								Control={<Checkbox
									name="repeatByRun" label="по пробегу"
									isChecked={formState.repeatByRun}/>}
							/>

							<Validated
								validate={validate}
								Control={ <FieldWithSuffix InputComponent={InputNumeric}
									name="repeatingRun" label="Пробег"
									value={formState.repeatingRun}
									suffix={FieldSuffixes.RUN}
									disabled={!formState.repeatByRun}/>}
							/>
						</FieldGroup>

						<FieldGroup>
							<Validated
								validate={validate}
								Control={ <Checkbox
									name="repeatByTime" label="по времени"
									isChecked={formState.repeatByTime}/>}
							/>

							<FieldGroup horizontal>

								<Validated
									validate={validate}
									Control={ <FieldWithSuffix InputComponent={InputNumeric}
										name="repeatingTime"label="Время"
										value={formState.repeatingTime}
										disabled={!formState.repeatByTime}
										suffix={getTimeSuffix(
											formState.repeatingTime,
											formState.repeatTimeSlot)} />}
								/>

								<Validated
									validate={validate}
									Control={ <Select
											name="repeatTimeSlot"
											options={timeSlotOptions}
											selected={formState.repeatTimeSlot}
											disabled={!formState.repeatByTime}/>}
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
					if (submit(formState)) {
						// dispatch(popupClosed());
					}
				}}
			/>
		</>
	);
}
