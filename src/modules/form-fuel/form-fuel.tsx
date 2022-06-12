import React, { useContext, useRef, useState } from "react";
import { FieldSuffixes } from "../../../global.var";
import { collectFormFields } from "../../utilities/collect-form-fields";
import Button from "../../components/button/button";
import FieldDate from "../../components/field/field-date";
import FieldWithSuffix from "../../components/field/field-with-suffix";
import InputNumeric from "../../components/field/input-numeric";
import InputDecimal from "../../components/field/input-decimal";
import dayjs from "dayjs";

import { FormComponentProps, setStateFunction, TargetFormFields, ValidateContext, ValidateFunction } from "../../HOC/with-validate-submit/with-validate-submit";
import { DispatchContext } from "../../components/popup-switch/popup-switch";
import { popupClosed } from "../../components/popup-switch/popup-switch-actions";

import containerStyles from "../../components/popup-container/popup-container.module.scss";
import styles from "./form-fuel.module.scss";

// ================================================

const fuelFormInitState = {
	fuelDate: dayjs().format("YYYY-MM-DD"),
	fuelRun: "220120",
	fuelCost: "",
	fuelPrice: "",
	fuelVolume: "",
};

export type FuelFormState = typeof fuelFormInitState;
export type FuelFormFields = keyof FuelFormState;

// ================================================

export default function FormFuel({ getValidate, submit }: FormComponentProps<FuelFormFields, FuelFormState>) {
	const [formState, setFormState] = useState<FuelFormState>(fuelFormInitState);
	const formRef = useRef({} as HTMLFormElement);
	const dispatch = useContext(DispatchContext);

	const validate = getValidate(setFormState as setStateFunction<FuelFormState>);

	return (
		<ValidateContext.Provider value={validate as ValidateFunction<TargetFormFields>}>
		
			<div className={containerStyles.popupContent}>
				<form className={containerStyles.form} ref={formRef} >
					<div className={styles.fuelFields}>

						<FieldDate name="fuelDate" label="Дата"
							auxStyles={styles.date} value={formState.fuelDate}
						/>
						<FieldWithSuffix InputComponent={InputNumeric}
							name="fuelRun" label="Пробег" value={formState.fuelRun}
							auxStyles={styles.run} suffix={FieldSuffixes.RUN}
						/>
						<FieldWithSuffix InputComponent={InputDecimal}
							name="fuelCost" label="Стоимость" value={formState.fuelCost}
							auxStyles={styles.cost} suffix={FieldSuffixes.MONEY}
						/>
						<FieldWithSuffix InputComponent={InputDecimal}
							name="fuelPrice" label="Цена за литр" value={formState.fuelPrice}
							auxStyles={styles.price} suffix={FieldSuffixes.MONEY}
						/>
						<FieldWithSuffix InputComponent={InputDecimal}
							name="fuelVolume" label="Объем" value={formState.fuelVolume}
							auxStyles={styles.volume} suffix={FieldSuffixes.VOLUME}
						/>

					</div>
				</form>
			</div>

			<Button title="Сохранить" auxStyles={containerStyles.saveButton}
				clickHandler={() => {
					if (submit(collectFormFields<FuelFormFields>(formRef.current))) {
						dispatch(popupClosed());
					}
				}}
				/>
		</ValidateContext.Provider>
	);
}
