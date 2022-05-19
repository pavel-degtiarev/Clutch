import * as React from "react";
import classNames from "classnames";

import styles from "./button-icon.scss";

interface ButtonIconProps {
	label?: string;
	auxClassNames?: string;
	handler: clickHandler;
}

export default function ButtonIcon({ label, auxClassNames, handler }: ButtonIconProps) {
	return (
		<button
			className={classNames(`${styles.icon}`, auxClassNames)}
			type="button"
			aria-label={label}
			onClick={handler}
		/>
	);
}
