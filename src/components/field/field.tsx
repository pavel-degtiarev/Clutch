import React, { useEffect, useState } from "react";
import { FormUnits } from "../../../global.var";
import { setUnits } from "../../utilities/units";

import classNames from "classnames";
import styles from "./field.module.scss";
import textStyles from "../../styles/typography.module.scss";

type FieldProps = {
	name: string;
	value: string;
	label: string;
	type?: string;
	auxStyles?: string;
	numeric?: boolean;
	units?: FormUnits | "";
};

export default function Field({
	name, value = "", label, type = "text", auxStyles, numeric = false, units = ""}: FieldProps) {
	const inputClassnames = classNames(styles.input, textStyles.titleNormal);
	const [fieldValue, setFieldValue] = useState(value);
	const [isEditing, setEditing] = useState(false);

	const formatField = (value: string): void => setFieldValue(numeric ? cleanNumeric(value) : value);

	useEffect(() => formatField(value), [value]);

	return (
		<div className={classNames(styles.field, auxStyles)}>
			{isEditing ? (
				<input
					className={inputClassnames}
					type={type}
					name={name}
					value={fieldValue}
					inputMode={numeric ? "decimal" : "text"}
					placeholder={" "}
					onChange={(e) => formatField(e.target.value)}
					onBlur={() => setEditing(!isEditing)}
				/>
			) : (
				<input
					className={inputClassnames}
					type={type}
					name={name}
					placeholder={" "}
					inputMode={numeric ? "decimal" : "text"}
					value={units ? setUnits(fieldValue, units) : fieldValue}
					onFocus={() => setEditing(!isEditing)}
					onChange={() => {}}
				/>
			)}

			<label className={classNames(styles.label, textStyles.titleNormal)} htmlFor={name}>
				{label}
			</label>
		</div>
	);
}

const cleanNumeric = (value: string): string => {	
	const clearVal = value.replace(/[^0-9\,\.]/g, "").replace(/\,/, ".");
	const separators = clearVal.match(/\./g);
	if (separators && separators.length > 1) {
		return clearVal.replace(/\.$/, "");
	}
	return clearVal;
};
