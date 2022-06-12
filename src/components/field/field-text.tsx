import React from "react";
import FieldContainer from "./field-container";
import { FieldProps, InputMode } from "./field-types";
import Input from "./input";
import Label from "./label";

interface FieldTextProps extends FieldProps {}

export default function FieldText({
	name, label, value, auxStyles, disabled = false, children,
	changeHandler, focusHandler, blurHandler }: FieldTextProps) {
	return (
		<FieldContainer auxStyles={auxStyles}>

			<Input name={name} value={value}
				inputMode={InputMode.TEXT}
				disabled={disabled}
				changeHandler={changeHandler}
				focusHandler={focusHandler}
				blurHandler={blurHandler}
			/>

			<Label inputName={name} label={label}/>
			
			{children}

		</FieldContainer>
	);
}
