import React, { useContext, useRef, useState } from "react";
import { FieldSuffixes } from "../../../global.var";
import { collectFormFields } from "../../utilities/collect-form-fields";
import Field from "../../components/field/field";
import Button from "../../components/button/button";
import dayjs from "dayjs";

import { FormComponentProps, setStateFunction } from "../../HOC/with-validate-submit/with-validate-submit";
import { DispatchContext } from "../../components/popup-switch/popup-switch";
import { popupClosed } from "../../components/popup-switch/popup-switch-actions";

import containerStyles from "../../components/popup-container/popup-container.module.scss";
import styles from "./form-fuel.module.scss";

// ================================================

const fuelFormInitState = {
	date: dayjs().format("YYYY-MM-DD"),
	run: "220120",
	cost: "",
	price: "",
	volume: "",
};

export type FuelFormState = typeof fuelFormInitState;
export type FuelFormFields = keyof FuelFormState;

// ================================================

export default function FormFuel({ validate, submit }: FormComponentProps<FuelFormFields, FuelFormState>) {
	const [formState, setFormState] = useState<FuelFormState>(fuelFormInitState);
	const formRef = useRef({} as HTMLFormElement);
	const dispatch = useContext(DispatchContext);

	return (
		<>
			<div className={containerStyles.popupContent}>
				<form
					className={containerStyles.form}
					ref={formRef}
					onChange={(e) => {
						const name = (e.target as HTMLInputElement).name as FuelFormFields;
						const value = (e.target as HTMLInputElement).value;
						validate(name, value, setFormState as setStateFunction<FuelFormState>);
					}}>
					
					<div className={styles.fuelFields}>
						<Field name="date" label="Дата" type="date"
							auxStyles={styles.date} value={formState.date}
						/>
						<Field name="run" label="Пробег" units={FieldSuffixes.RUN}
							auxStyles={styles.run} value={formState.run} numeric
						/>
						<Field name="cost" label="Стоимость" units={FieldSuffixes.MONEY}
							auxStyles={styles.cost} value={formState.cost} numeric
						/>
						<Field name="price" label="Цена за литр" units={FieldSuffixes.MONEY}
							auxStyles={styles.price} value={formState.price} numeric
						/>
						<Field name="volume" label="Объем" units={FieldSuffixes.VOLUME}
							auxStyles={styles.volume} value={formState.volume} numeric
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
		</>
	);
}
