import React, { ReactNode, useState } from "react";
import classNames from "classnames";

import styles from "./checkbox.module.scss";
import textStyles from "../../styles/typography.module.scss";

type CheckboxProps = {
	name: string;
	label: string;
	isChecked: boolean;
	auxStyles?: string;
	children?: ReactNode;
	callback?: Function;
};

export default function Checkbox({
	name, label, auxStyles, isChecked = false, children = null, callback = () => { } }: CheckboxProps) {
	
	const [checkboxChecked, setCheckboxChecked] = useState(isChecked);
	const id = `${name}`;

	return (
		<div className={classNames(styles.checkbox, auxStyles)}>
			<input className={styles.input} type="checkbox"
				id={id} name={name} checked={checkboxChecked}
				onChange={() => {
					setCheckboxChecked((prevState) => !prevState);
					callback(checkboxChecked);
				}}
			/>
			<label className={classNames(styles.label, textStyles.titleNormal)} htmlFor={name}>
				{label}
			</label>

			{children}
		</div>
	);
}
