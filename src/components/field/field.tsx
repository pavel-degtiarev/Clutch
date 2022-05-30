import React, { useState } from "react";
import classNames from "classnames";
import styles from "./field.module.scss";
import textStyles from "../../styles/typography.module.scss";

type FieldProps = {
	name: string;
	label: string;
	auxStyles?: string;
	numeric?: boolean;
	units?: string;
};

export default function Field({ name, label, auxStyles, numeric = false, units = "" }: FieldProps) {
	const [value, setValue] = useState("");
	const setUnits = (e:any) => setValue(`${e.target.value} ${units}`);
	const removeUnits = (e:any) => setValue(e.target.value.replace(` ${units}`, ""));

	return (
		<div className={classNames(styles.field, auxStyles)}>
			<input
				className={classNames(styles.input, textStyles.titleNormal)}
				type="text"
				name={name}
				value={value}
				inputMode={numeric ? "decimal" : "text"}
				placeholder={" "}
				onChange={(e) => setValue(e.target.value)}
				onBlur={units ? setUnits : undefined}
				onFocus={units ? removeUnits : undefined}
			/>
			<label className={classNames(styles.label, textStyles.titleNormal)} htmlFor={name}>
				{label}
			</label>
		</div>
	);
}
