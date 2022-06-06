import React, { ReactNode } from "react";
import classNames from "classnames";

import styles from "./checkbox.module.scss";
import textStyles from "../../styles/typography.module.scss";

type CheckboxProps = {
	name: string;
	label: string;
	auxStyles?: string;
	children?: ReactNode;
};

export default function Checkbox({ name, label, auxStyles, children = null }: CheckboxProps) {
	const id = `${name}`; // TODO Need generate unique ID

	return (
		<div className={classNames(styles.checkbox, auxStyles)}>
			<input className={styles.input} type="checkbox" id={id} name={name} />
			<label className={classNames(styles.label, textStyles.titleNormal)} htmlFor={name}>
				{label}
			</label>

			{children}
		</div>
	);
}
