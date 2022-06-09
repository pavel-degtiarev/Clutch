import { ReactNode } from "react";

import { InputProps } from "./input";
import { LabelProps } from "./label";

export enum InputType {
	TEXT = "text",
	NUMBER = "number",
	DATE = "date",
}

export enum InputMode {
	TEXT = "text",
	NUMERIC = "numeric",
	DECIMAL = "decimal",
}

export interface WithChildren {
	children?: ReactNode;
}

export interface ControlledField {
	changeHandler?: (value: string) => string;
	focusHandler?: (arg: any) => void;
	blurHandler?: (arg: any) => void;
}

export interface FieldProps extends
    Pick<InputProps, "name" | "value" | "disabled">,
		Pick<LabelProps, "label">,
		ControlledField,
		WithChildren {
	auxStyles?: string;
}
