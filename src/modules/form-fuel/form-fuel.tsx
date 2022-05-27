import * as React from "react";
import Field from "../../components/field/field";

import styles from "./form-fuel.module.scss";

export default function FormFuel() {
	return (
		<div className={styles.fuelFields}>
			<Field name="date" label="Дата" auxStyles={styles.date} />
			<Field name="run" label="Пробег" auxStyles={styles.run} />
			<Field name="cost" label="Стоимость" auxStyles={styles.cost} />
			<Field name="price" label="Цена за литр" auxStyles={styles.price} />
			<Field name="volume" label="Объем" auxStyles={styles.volume} />
		</div>
	);
}
