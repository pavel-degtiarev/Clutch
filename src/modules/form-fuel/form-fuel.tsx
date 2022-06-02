import React, { useContext, useRef, useState } from "react";
import Field from "../../components/field/field";
import Button from "../../components/button/button";
import dayjs from "dayjs";

import { DispatchContext } from "../../components/popup-switch/popup-switch";
import { popupClosed } from "../../components/popup-switch/popup-switch-actions";

import containerStyles from "../../components/popup-container/popup-container.module.scss";
import styles from "./form-fuel.module.scss";


// ================================================

const formInitState = {
	date: dayjs().format("YYYY-MM-DD"),
	run: "220120",
	cost: "",
	price: "",
	volume: "",
};

type FormFields = keyof typeof formInitState;
type FormValidations = {
	[key in FormFields]?: (value: string) => void;
};

// ================================================

export default function FormFuel() {
	const [formState, setFormState] = useState(formInitState);
	const formRef = useRef({} as HTMLFormElement);
	const dispatch = useContext(DispatchContext);

	const validations: FormValidations = {
		date: (value) => console.log("check if Run is consistent", value, formState.run),
		run: (value) => console.log("check if Run is consistent", value, formState.date),

		cost: (value) => {
			// calc volume with fixed price
			setFormState((prevState) => {
				const newState = { ...prevState, cost: value };
				if (+newState.price > 0) {
					newState.volume = `${Math.round((+newState.cost / +newState.price) * 10) / 10}`;
				}
				if (+newState.cost == 0) { newState.volume = "" }
				return newState;
			});
		},

		price: (value) => {
			// calc volume with fixed cost
			setFormState((prevState) => {
				const newState = { ...prevState, price: value };
				if (+newState.cost > 0) {
					newState.volume = `${Math.round((+newState.cost / +newState.price) * 10) / 10}`;
				}
				if (+newState.price == 0) { newState.volume = "" }
				return newState;
			});
		},

		volume: (value) => {
			// calc cost with fixed price
			setFormState((prevState) => {
				const newState = { ...prevState, volume: value };
				if (+newState.price > 0) {
					newState.cost = `${Math.round(+newState.volume * +newState.price)}`;
				}
				if (+newState.volume == 0) { newState.cost = "" }
				return newState;
			});
		},
	};

	function validateForm(target: FormFields, value: string) {
		const checkTarget = validations[target];
		checkTarget && checkTarget(value);
	}

	function submitFuelForm(formRef: HTMLFormElement): boolean {
		const form = new FormData(formRef);
		const formFields = [];

		for (const field of form) {
			formFields.push({ field: field[0], value: field[1] });
		}

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
							(e.target as HTMLInputElement).name as FormFields,
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
							name="run" label="Пробег" units="км."
							auxStyles={styles.run}
							value={formState.run} numeric
						/>
						<Field
							name="cost" label="Стоимость" units="руб."
							auxStyles={styles.cost}
							value={formState.cost} numeric
						/>
						<Field
							name="price" label="Цена за литр" units="руб."
							auxStyles={styles.price}
							value={formState.price} numeric
						/>
						<Field
							name="volume" label="Объем" units="л."
							auxStyles={styles.volume}
							value={formState.volume} numeric
						/>
					</div>
				</form>
			</div>

			<Button
				title="Сохранить"
				auxStyles={containerStyles.saveButton}
				clickHandler={() => {
					if (submitFuelForm(formRef.current)) {
						dispatch(popupClosed())
					}
				}}
			/>
		</>
	);
}

