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
};

export default function Select({ name, options, selected }: SelectProps) {
	return (
		<select className={styles.select} name={name} id={name} defaultValue={selected.value}>
			{options.map((item, index) => (
				<option key={index} value={item.value}>
					{item.label}
				</option>
			))}
		</select>
	);
}
