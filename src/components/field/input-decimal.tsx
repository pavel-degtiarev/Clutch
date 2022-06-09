import React, { useCallback } from "react";
import Input, { InputProps } from "./input";
import { cleanDecimal } from "./clean-field";
import { InputMode } from "./field-types";

export interface InputDecimalProps extends InputProps {}

export default function InputDecimal({
	name, value, focusHandler, blurHandler }: InputDecimalProps) {
	
	const clean = useCallback(cleanDecimal, []);

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
