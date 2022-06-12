import React, { useCallback } from "react";
import Input, { InputProps } from "./input";
import { cleanDecimal } from "./clean-field";
import { InputMode } from "./field-types";

export interface InputDecimalProps extends InputProps {}

export default function InputDecimal({
	name, value, disabled, focusHandler, blurHandler }: InputDecimalProps) {
	
	const clean = useCallback(cleanDecimal, []);

	return (
		<Input
			name={name}
			value={value}
			inputMode={InputMode.NUMERIC}
			disabled={disabled}
			changeHandler={clean}
			focusHandler={focusHandler}
			blurHandler={blurHandler}
		/>
	);
}
