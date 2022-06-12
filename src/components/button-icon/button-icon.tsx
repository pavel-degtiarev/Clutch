import * as React from "react";
import classNames from "classnames";

import styles from "./button-icon.module.scss";

interface ButtonIconProps {
	label?: string;
	auxClassNames?: string;
	disabled?: boolean;
	handler: clickHandler;
}

export default function ButtonIcon({
	label, auxClassNames, disabled = false, handler, }: ButtonIconProps) {
	
	const buttonStyles = classNames(styles.icon, { [styles.iconDisabled]: disabled }, auxClassNames);
	return <button className={buttonStyles} type="button" aria-label={label} onClick={handler} />;
}
