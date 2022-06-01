import React, { useState } from "react";
import Field from "../../components/field/field";
import dayjs from "dayjs";

import styles from "./form-fuel.module.scss";

export default function FormFuel() {
	const formInitState = {
		date: dayjs().format("YYYY-MM-DD"),
		run: 220120,
		cost: "",
		price: "",
		volume: "",
	};

	const [formState, setFormState] = useState(formInitState);

	return (
		<div className={styles.fuelFields}>
			<Field
				name="date"
				label="Дата"
				type="date"
				auxStyles={styles.date}
				value={formState.date}
			/>
			<Field
				name="run"
				label="Пробег"
				auxStyles={styles.run}
				units="км."
				value={formState.run}
				numeric
			/>
			<Field
				name="cost"
				label="Стоимость"
				auxStyles={styles.cost}
				units="руб."
				value={formState.cost}
				numeric
			/>
			<Field
				name="price"
				label="Цена за литр"
				auxStyles={styles.price}
				units="руб."
				value={formState.price}
				numeric
			/>
			<Field
				name="volume"
				label="Объем"
				auxStyles={styles.volume}
				units="л."
				value={formState.volume}
				numeric
			/>
		</div>
	);
}

export function submitFuelForm(formRef: HTMLFormElement): boolean {
	const form = new FormData(formRef);
	const formFields = [];

	for (const field of form) {
		formFields.push({ field: field[0], value: field[1] });
	}

	console.log("Send FormFuel data to API", formFields);
	return true;
}
