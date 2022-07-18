import React, { useContext, useState } from "react";
import { FieldSuffixes } from "../../general/global.var";
import Button from "../../components/button/button";
import FieldDate from "../../components/field/field-date";
import FieldWithSuffix from "../../components/field/field-with-suffix";
import InputNumeric from "../../components/field/input/input-numeric";
import InputDecimal from "../../components/field/input/input-decimal";
import Validated from "../../HOC/validated/validated";

import { FormComponentProps, setStateFunction } from "../../HOC/with-validate-submit/with-validate-submit";
import { DispatchContext } from "../../components/popup-switch/popup-switch";
import { formClosed } from "../../components/popup-switch/popup-switch-actions";

import containerStyles from "../../components/popup-container/popup-container.module.scss";
import styles from "./form-fuel.module.scss";
import { FuelFormFields, FuelFormState } from "../../store/form-init-states";

// ================================================

export default function FormFuel({ getValidate, submit, initState
}: FormComponentProps<FuelFormFields, FuelFormState>) {
	
	const [formState, setFormState] = useState<FuelFormState>(initState);
	const dispatch = useContext(DispatchContext);

	const validate = getValidate(setFormState as setStateFunction<FuelFormState>);

	return (
		<>
			<div className={containerStyles.popupContent}>
				<form className={containerStyles.form}>
					<div className={styles.fuelFields}>
						
						<Validated<FuelFormFields>
							validate={validate}
							Control={
								<FieldDate
									name="fuelDate"
									label="Дата"
									auxStyles={styles.date}
									value={formState.fuelDate}
								/>
							}
						/>

						<Validated<FuelFormFields>
							validate={validate}
							Control={
								<FieldWithSuffix
									InputComponent={InputNumeric}
									name="fuelRun"
									label="Пробег"
									value={formState.fuelRun}
									auxStyles={styles.run}
									suffix={FieldSuffixes.RUN}
								/>
							}
						/>

						<Validated<FuelFormFields>
							validate={validate}
							Control={
								<FieldWithSuffix
									InputComponent={InputDecimal}
									name="fuelCost"
									label="Стоимость"
									value={formState.fuelCost}
									auxStyles={styles.cost}
									suffix={FieldSuffixes.MONEY}
								/>
							}
						/>

						<Validated<FuelFormFields>
							validate={validate}
							Control={
								<FieldWithSuffix
									InputComponent={InputDecimal}
									name="fuelPrice"
									label="Цена за литр"
									value={formState.fuelPrice}
									auxStyles={styles.price}
									suffix={FieldSuffixes.MONEY}
								/>
							}
						/>

						<Validated<FuelFormFields>
							validate={validate}
							Control={
								<FieldWithSuffix
									InputComponent={InputDecimal}
									name="fuelVolume"
									label="Объем"
									value={formState.fuelVolume}
									auxStyles={styles.volume}
									suffix={FieldSuffixes.VOLUME}
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
						dispatch(formClosed());
					}
				}}
			/>
		</>
	);
}
