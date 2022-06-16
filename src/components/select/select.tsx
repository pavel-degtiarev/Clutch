import React from "react";
import { TimeUnits } from "../../../global.var";
import { ControlledField } from "../field/field-types";
import styles from "./select.module.scss";

type SelectOption = {
	label: string;
	value: TimeUnits;
};

export interface SelectProps extends ControlledField {
	name: string;
	options: SelectOption[];
	selected: SelectOption;
	disabled?: boolean;
}

export default function Select({ name, options, selected, disabled = false }: SelectProps) {
	return (
		<select
			name={name} id={name}
			className={styles.select}
			defaultValue={selected.value}
			disabled={disabled}>
			{options.map((item, index) => (
				<option key={index} value={item.value}>
					{item.label}
				</option>
			))}
		</select>
	);
}
