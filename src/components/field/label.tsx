import React from "react";
import classNames from "classnames";
import styles from "./field.module.scss";
import textStyles from "../../styles/typography.module.scss";

export interface LabelProps {
	inputName: string;
	label: string;
};

export default function Label({ inputName, label }: LabelProps) {
	return (
		<label className={classNames(styles.label, textStyles.titleNormal)} htmlFor={inputName}>
			{label}
		</label>
	);
}
