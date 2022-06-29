import React from "react";
import { TimeUnits } from "../../../global.var";
import { ControlledField } from "../field/field-types";
import styles from "./select.module.scss";

type SelectOption = {
	label: string;
	value: TimeUnits;
};

export interface SelectProps extends ControlledField<string> {
	name: string;
	options: SelectOption[];
	selected: TimeUnits;
	disabled?: boolean;
}

export default function Select({
	name, options, selected, disabled = false, changeHandler }: SelectProps) {
	return (
		<select
			name={name}
			id={name}
			className={styles.select}
			defaultValue={selected}
			disabled={disabled}
			onChange={(e)=>changeHandler && changeHandler(e.target.value)}
		>
			
			{options.map((item, index) => (
				<option key={index} value={item.value}>
					{item.label}
				</option>
			))}

		</select>
	);
}
