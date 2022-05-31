import React, { FocusEvent, useState } from "react";
import classNames from "classnames";
import styles from "./field.module.scss";
import textStyles from "../../styles/typography.module.scss";

type FieldProps = {
	name: string;
	value?: string;
	label: string;
	auxStyles?: string;
	numeric?: boolean;
	units?: string;
	validator?: ((arg: string) => string) | null;
};

export default function Field({
	name,
	value = "",
	label,
	auxStyles,
	numeric = false,
	units = "",
	validator,
}: FieldProps) {
	const [fieldValue, setFieldValue] = useState(value);

	const setUnits = (e: FocusEvent<HTMLInputElement>) =>
		(e.target.value !== "") && setFieldValue(`${e.target.value} ${units}`);
	
	const removeUnits = (e: FocusEvent<HTMLInputElement>) =>
		setFieldValue(e.target.value.replace(` ${units}`, ""));
	
	const setValue = (e: FocusEvent<HTMLInputElement>) => {
		const newValue = numeric ? cleanNum(e.target.value) : e.target.value;
		const validatedValue = validator ? validator(newValue) : newValue;
		setFieldValue(validatedValue);
	};

	function cleanNum(value: string): string {
		const clearVal = value.replace(/[^0-9\,\.]/, "");
		const separators = clearVal.match(/[\.\,]/g);
		if (separators && separators.length > 1) {
			return clearVal.replace(/[\,\.]$/, "");
		}
		return clearVal;
	}

	return (
		<div className={classNames(styles.field, auxStyles)}>
			<input
				className={classNames(styles.input, textStyles.titleNormal)}
				type="text"
				name={name}
				value={fieldValue}
				inputMode={numeric ? "decimal" : "text"}
				placeholder={" "}
				onChange={setValue}
				onBlur={units ? setUnits : undefined}
				onFocus={units ? removeUnits : undefined}
			/>
			<label className={classNames(styles.label, textStyles.titleNormal)} htmlFor={name}>
				{label}
			</label>
		</div>
	);
}
