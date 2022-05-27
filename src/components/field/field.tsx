import * as React from "react";
import classNames from "classnames";
import styles from "./field.module.scss";
import textStyles from "../../styles/typography.module.scss";

type FieldProps = {
	name: string;
	label: string;
	auxStyles?: string;
	mode?: "text" | "decimal";
};

export default function Field({ name, label, auxStyles, mode = "text" }: FieldProps) {
	return (
		<div className={classNames(styles.field, auxStyles)}>
			<input
				className={classNames(styles.input, textStyles.titleNormal)}
				type="text"
				name={name}
				inputMode={mode}
				placeholder={mode === "text" ? " " : undefined}
			/>
			<label className={classNames(styles.label, textStyles.titleNormal)} htmlFor={name}>
				{label}
			</label>
		</div>
	);
}
