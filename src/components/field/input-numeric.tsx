import React, { useCallback } from "react";
import Input, { InputProps } from "./input";
import { cleanNumeric } from "./clean-field";
import { InputMode } from "./field-types";

export interface InputNumericProps extends InputProps {}

export default function InputNumeric({
	name, value, focusHandler, blurHandler }: InputNumericProps) {
	
	const clean = useCallback(cleanNumeric, []);
		
	return (
		<Input
			name={name}
			value={value}
			inputMode={InputMode.NUMERIC}
			changeHandler={clean}
			focusHandler={focusHandler}
			blurHandler={blurHandler}
		/>
	);
}
