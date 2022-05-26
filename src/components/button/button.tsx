import * as React from "react";
import classNames from "classnames";
import typeStyles from "../../styles/typography.module.scss";
import buttonStyles from "../../styles/components/button.module.scss";
import styles from "./button.module.scss";

type ButtonProps = {
	title: string;
	withMark?: boolean;
	auxClasses?: string | string[];
	clickHandler: clickHandler;
};

export default function Button({ title, withMark = false, auxClasses, clickHandler }: ButtonProps) {
	const classes = classNames(buttonStyles.button, styles.main, typeStyles.titleNormal, {
		[buttonStyles.withMark]: withMark,
		[buttonStyles.auxClasses]: auxClasses,
	});
	return (
		<button type="button" className={classes} onClick={clickHandler}>
			{title}
		</button>
	);
}
