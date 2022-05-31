import * as React from "react";
import Field from "../../components/field/field";
import dayjs from "dayjs";

import styles from "./form-fuel.module.scss";
import DatePickerField from "../../components/date-picker-field/date-picker-field";

export default function FormFuel() {
	const validate = (val: string) => {
		console.log(val);
		return val;
	};

	return (
		<div className={styles.fuelFields}>
			
			<DatePickerField
				name="date"
				label="Дата"
				auxStyles={styles.date} />

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
