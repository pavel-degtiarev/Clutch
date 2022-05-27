import * as React from "react";
import classNames from "classnames";
import styles from "./field.module.scss";

type FieldProps = {
	name: string;
	mode?: "text" | "decimal";
};

export default function Field({ name, mode = "text" }: FieldProps) {
	return (
		<div className={classNames(styles.field, `field-${name}`)}>
			<input
				className={styles.input}
				type="text"
				name={name}
				inputMode={mode}
				placeholder={mode === "text" ? " " : undefined}
			/>
			<label className={styles.label} htmlFor={name}>
				Дата
			</label>
		</div>
	);
}
