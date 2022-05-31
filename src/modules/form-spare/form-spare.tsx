import * as React from "react";
import Field from "../../components/field/field";
import dayjs from "dayjs";

import styles from "./form-spare.module.scss";

export default function FormSpare() {
	const validate = (val: string) => {
		console.log(val);
		return val;
	};

	return (
		<div className={styles.spareFields}>

			<Field
				name="date"
				label="Дата"
				type="date"
				value={dayjs().format("YYYY-MM-DD")}
				validator={validate}
			/>

			<Field name="title"
				label="Наименование"
				validator={validate}
			/>

			<Field
				name="price"
				label="Цена"
				units="руб."
				validator={validate}
				numeric
			/>
			
		</div>
	);
}
