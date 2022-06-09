import React, { useCallback, useEffect, useState } from "react";
import { ControlledField, InputMode, InputType } from "./field-types";

import classNames from "classnames";
import styles from "./field.module.scss";
import textStyles from "../../styles/typography.module.scss";

export interface InputProps extends ControlledField {
	name: string;
	value: string;
	type?: InputType;
	inputMode?: InputMode;
	disabled?: boolean;
}

export default function Input({
	name, value, type=InputType.TEXT, inputMode, disabled,
	changeHandler, focusHandler, blurHandler }: InputProps) {
		
	const inputClassnames = classNames(styles.input, textStyles.titleNormal);
	const [fieldValue, setFieldValue] = useState(value);
	
	const changeField = useCallback(
		(value: string) => {
			setFieldValue(changeHandler ? changeHandler(value) : value);
		},
		[changeHandler]
	);

	useEffect(() => changeField(value), [value]);

	return (
			<input
				className={inputClassnames}
				type={type} name={name} id={name} value={fieldValue}
				inputMode={inputMode} placeholder={" "}
				onChange={(e) => changeField(e.target.value)}
				onBlur={blurHandler}
				onFocus={focusHandler}
				disabled={disabled}
			/>
	);
}


