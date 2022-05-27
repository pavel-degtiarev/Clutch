import * as React from "react";
import classNames from "classnames";
import styles from "./field.module.scss";
import textStyles from "../../styles/typography.module.scss";

type FieldProps = {
	name: string;
	label: string;
	auxStyles?: string;
	numeric?: boolean;
};

export default function Field({ name, label, auxStyles, numeric = false }: FieldProps) {
	return (
		<div className={classNames(styles.field, auxStyles)}>
			<input
				className={classNames(styles.input, textStyles.titleNormal)}
				type="text"
				name={name}
				inputMode={numeric ? "decimal" : "text"}
				placeholder={" "}
			/>
			<label className={classNames(styles.label, textStyles.titleNormal)} htmlFor={name}>
				{label}
			</label>
		</div>
	);
}
