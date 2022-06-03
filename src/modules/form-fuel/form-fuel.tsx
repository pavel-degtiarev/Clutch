import React, { useContext, useRef, useState } from "react";
import { FormUnits } from "../../../global.var";
import { collectFormFields } from "../../utilities/collect-form-fields";
import Field from "../../components/field/field";
import Button from "../../components/button/button";
import dayjs from "dayjs";

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

type FuelFormFields = keyof typeof fuelFormInitState;

// ================================================

export default function FormFuel() {
	const [formState, setFormState] = useState(fuelFormInitState);
	const formRef = useRef({} as HTMLFormElement);
	const dispatch = useContext(DispatchContext);

	function validateForm(target: FuelFormFields, value: string) {
		const validations: FormValidations<FuelFormFields> = {
			date: (value) => console.log("check if Run is consistent", value, formState.run),
			run: (value) => console.log("check if Run is consistent", value, formState.date),

			cost: (value) => {
				setFormState((prevState) => {
					const newState = { ...prevState, cost: value }; // calc volume with fixed price
					if (+newState.price > 0) {
						newState.volume = `${Math.round((+newState.cost / +newState.price) * 10) / 10}`;
					}
					if (+newState.cost == 0) { newState.volume = "" }
					return newState;
				});
			},

			price: (value) => {
				setFormState((prevState) => {
					const newState = { ...prevState, price: value }; // calc volume with fixed cost
					if (+newState.cost > 0) {
						newState.volume = `${Math.round((+newState.cost / +newState.price) * 10) / 10}`;
					}
					if (+newState.price == 0) { newState.volume = "" }
					return newState;
				});
			},

			volume: (value) => {
				setFormState((prevState) => {
					const newState = { ...prevState, volume: value }; // calc cost with fixed price
					if (+newState.price > 0) {
						newState.cost = `${Math.round(+newState.volume * +newState.price)}`;
					}
					if (+newState.volume == 0) { newState.cost = "" }
					return newState;
				});
			},
		};

		const checkTarget = validations[target];
		checkTarget && checkTarget(value);
	}

	function submitForm(formFields: FormFields<FuelFormFields>): boolean {
		console.log("Send FormFuel data to API", formFields);
		return true;
	}

	return (
		<>
			<div className={containerStyles.popupContent}>
				<form
					className={containerStyles.form}
					ref={formRef}
					onChange={(e) =>
						validateForm(
							(e.target as HTMLInputElement).name as FuelFormFields,
							(e.target as HTMLInputElement).value
						)
					}>
					<div className={styles.fuelFields}>
						<Field
							name="date" label="Дата" type="date"
							auxStyles={styles.date}
							value={formState.date}
						/>
						<Field
							name="run" label="Пробег" units={FormUnits.RUN}
							auxStyles={styles.run}
							value={formState.run}
							numeric
						/>
						<Field
							name="cost" label="Стоимость" units={FormUnits.MONEY}
							auxStyles={styles.cost}
							value={formState.cost}
							numeric
						/>
						<Field
							name="price" label="Цена за литр" units={FormUnits.MONEY}
							auxStyles={styles.price}
							value={formState.price}
							numeric
						/>
						<Field
							name="volume" label="Объем" units={FormUnits.VOLUME}
							auxStyles={styles.volume}
							value={formState.volume}
							numeric
						/>
					</div>
				</form>
			</div>

			<Button
				title="Сохранить"
				auxStyles={containerStyles.saveButton}
				clickHandler={() => {
					if (submitForm(collectFormFields<FuelFormFields>(formRef.current))) {
						dispatch(popupClosed());
					}
				}}
			/>
		</>
	);
}


