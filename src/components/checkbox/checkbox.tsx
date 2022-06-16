import React, { ReactNode, useCallback, useEffect, useState } from "react";
import Label from "../field/label/label";
import { ControlledField } from "../field/field-types";
import classNames from "classnames";

import styles from "./checkbox.module.scss";

export interface CheckboxProps extends ControlledField<boolean> {
	name: string;
	label: string;
	isChecked: boolean;
	auxStyles?: string;
	children?: ReactNode;
}

export default function Checkbox({
	name, label, auxStyles, isChecked, children, changeHandler }: CheckboxProps) {
	
	const [checkboxChecked, setCheckboxChecked] = useState(isChecked);

	const changeCheckboxState = useCallback(() => {
		const newState = !checkboxChecked;
		changeHandler && changeHandler(newState);
		setCheckboxChecked(newState);
	}, [changeHandler])

	useEffect(()=>setCheckboxChecked(isChecked), [isChecked]);

	return (
		<div className={classNames(styles.checkbox, auxStyles)}>
			<input
				id={name} name={name}
				className={styles.input} type="checkbox"
				checked={checkboxChecked}
				onChange={changeCheckboxState}
			/>

			<Label inputName={name} label={label} auxStyles={styles.label} />

			{children}
		</div>
	);
}
