import React, { useCallback } from "react";
import Input, { InputProps } from "./input";
import { cleanNumeric } from "../clean-field";
import { InputMode } from "../field-types";

export interface InputNumericProps extends InputProps {}

export default function InputNumeric({
	name, value, disabled, focusHandler, blurHandler, changeHandler }: InputNumericProps) {
	
	const clean = useCallback(cleanNumeric, []);
	
	return (
		<Input
			name={name}
			value={value}
			inputMode={InputMode.NUMERIC}
			disabled={disabled}
			changeHandler={(val) => (changeHandler ? changeHandler(clean(val)) : clean(val))}
			focusHandler={focusHandler}
			blurHandler={blurHandler}
		/>
	);
}
