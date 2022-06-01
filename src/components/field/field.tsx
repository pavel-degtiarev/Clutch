import React, { useState } from "react";
import classNames from "classnames";
import styles from "./field.module.scss";
import textStyles from "../../styles/typography.module.scss";

type FieldProps = {
	name: string;
	value?: string | number;
	label: string;
	type?: string;
	auxStyles?: string;
	numeric?: boolean;
	units?: string;
};

export default function Field({
	name, value = "", label, type="text", auxStyles, numeric = false, units = ""}: FieldProps) {
	const [fieldValue, setFieldValue] = useState(value);

	const setUnits = (val: string): string => (val !== "" ? `${val} ${units}` : val);
	const removeUnits = (val: string): string => val.replace(` ${units}`, "");
	const checkValue = (val: string): string =>  numeric ? cleanNum(val) : val;

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
				type={type}
				name={name}
				value={fieldValue}
				inputMode={numeric ? "decimal" : "text"}
				placeholder={" "}
				onChange={(e) => setFieldValue(checkValue(e.target.value))}
				onBlur={units ? (e) => setFieldValue(setUnits(e.target.value)) : undefined}
				onFocus={units ? (e) => setFieldValue(removeUnits(e.target.value)) : undefined}
			/>
			<label className={classNames(styles.label, textStyles.titleNormal)} htmlFor={name}>
				{label}
			</label>
		</div>
	);
}
