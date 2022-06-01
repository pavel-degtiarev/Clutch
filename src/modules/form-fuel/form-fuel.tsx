import * as React from "react";
import Field from "../../components/field/field";
import dayjs from "dayjs";

import styles from "./form-fuel.module.scss";

export default function FormFuel() {

	const validate = (val: string): string => {
		// console.log(val);
		return val;
	};

	return (
		<div className={styles.fuelFields}>
			<Field
				name="date"
				label="Дата"
				type="date"
				auxStyles={styles.date}
				value={dayjs().format("YYYY-MM-DD")}
				validator={validate}
			/>

			<Field
				name="run"
				label="Пробег"
				auxStyles={styles.run}
				units="км."
				validator={validate}
				numeric
			/>
			<Field
				name="cost"
				label="Стоимость"
				auxStyles={styles.cost}
				units="руб."
				validator={validate}
				numeric
			/>
			<Field
				name="price"
				label="Цена за литр"
				auxStyles={styles.price}
				units="руб."
				validator={validate}
				numeric
			/>
			<Field
				name="volume"
				label="Объем"
				auxStyles={styles.volume}
				units="л."
				validator={validate}
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
