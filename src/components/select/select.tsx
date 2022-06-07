import React from "react";
import { TimelUnit } from "../../../global.var";
import styles from "./select.module.scss";

type SelectOption = {
	label: string;
	value: TimelUnit;
};

type SelectProps = {
	name: string;
	options: SelectOption[];
	selected: SelectOption;
	disabled?: boolean;
};

export default function Select({ name, options, selected, disabled=false }: SelectProps) {
	return (
		<select className={styles.select} name={name} id={name}
			defaultValue={selected.value} disabled={disabled}>
			
			{options.map((item, index) => (
				<option key={index} value={item.value}>
					{item.label}
				</option>
			))}
		</select>
	);
}
