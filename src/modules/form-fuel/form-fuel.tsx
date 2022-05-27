import * as React from "react";
import Field from "../../components/field/field";

import styles from "./form-fuel.module.scss";

export default function FormFuel() {
	return (
		<div className={styles.fuelFields}>
			<Field name="date" label="Дата" auxStyles={styles.date} />
			<Field name="run" label="Пробег" auxStyles={styles.run} numeric/>
			<Field name="cost" label="Стоимость" auxStyles={styles.cost} numeric/>
			<Field name="price" label="Цена за литр" auxStyles={styles.price} numeric/>
			<Field name="volume" label="Объем" auxStyles={styles.volume} numeric/>
		</div>
	);
}
