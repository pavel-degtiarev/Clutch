import { ReactNode } from "react";

import { InputProps } from "./input/input";
import { LabelProps } from "./label/label";

export enum InputType {
	TEXT = "text",
	NUMBER = "number",
	DATE = "date",
	CHECKBOX = "checkbox",
}

export enum InputMode {
	TEXT = "text",
	NUMERIC = "numeric",
	DECIMAL = "decimal",
}

export interface WithChildren {
	children?: ReactNode;
}

export interface ControlledField<T extends string | boolean> {
	changeHandler?: (value: T) => T;
	focusHandler?: (arg: any) => void;
	blurHandler?: (arg: any) => void;
}

export interface FieldProps
	extends Pick<InputProps, "name" | "value" | "disabled">,
		Pick<LabelProps, "label">,
		ControlledField<string>,
		WithChildren {
	auxStyles?: string;
}
