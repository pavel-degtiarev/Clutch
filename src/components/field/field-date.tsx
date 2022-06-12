import React from "react";
import FieldContainer from "./field-container";
import { FieldProps, InputMode, InputType } from "./field-types";
import Input from "./input";
import Label from "./label";

interface FieldDateProps extends FieldProps {}

export default function FieldDate({
	name, label, value, auxStyles, disabled = false, children,
	changeHandler, focusHandler, blurHandler }: FieldDateProps) {
	return (
		<FieldContainer auxStyles={auxStyles}>
			
			<Input
				name={name} value={value} disabled={disabled}
				inputMode={InputMode.TEXT} type={InputType.DATE}
				changeHandler={changeHandler}
				focusHandler={focusHandler}
				blurHandler={blurHandler}
			/>

			<Label inputName={name} label={label} />

			{children}

		</FieldContainer>
	);
}
