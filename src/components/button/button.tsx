import React, { useState } from "react";
import classNames from "classnames";
import typeStyles from "../../styles/typography.module.scss";
import buttonStyles from "../../styles/components/button.module.scss";
import styles from "./button.module.scss";

type ButtonProps = {
	title: string;
	auxStyles?: string | string[];
	children?: React.ReactNode;
	clickHandler: clickHandler;
};

export default function Button({ title, auxStyles, children, clickHandler }: ButtonProps) {
	const classes = classNames(
		buttonStyles.button,
		typeStyles.titleNormal,
		styles.mainButton,
		auxStyles
	);

	return (
		<button type="button" className={classes} onClick={clickHandler}>
			{title}
			{children}
		</button>
	);
}
