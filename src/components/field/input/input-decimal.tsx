import React, { useCallback } from "react";
import Input, { InputProps } from "./input";
import { cleanDecimal } from "../clean-field";
import { InputMode } from "../field-types";

export interface InputDecimalProps extends InputProps {}

export default function InputDecimal({
	name, value, disabled, focusHandler, blurHandler, changeHandler }: InputDecimalProps) {
	
	const clean = useCallback(cleanDecimal, []);
	const handler = (val: string) => (changeHandler ? changeHandler(clean(val)) : clean(val));

	return (
		<Input
			name={name}
			value={value}
			inputMode={InputMode.DECIMAL}
			disabled={disabled}
			changeHandler={handler}
			focusHandler={focusHandler}
			blurHandler={blurHandler}
		/>
	);
}
