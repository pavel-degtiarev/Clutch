import React, { ReactNode } from "react";
import classNames from "classnames";
import ButtonIcon from "../button-icon/button-icon";

import styles from "./popup-container.module.scss";
import textStyles from "../../styles/typography.module.scss";
import Button from "../button/button";
import { popupClosed } from "../popup-switch/popup-switch-actions";

type PopupContainerProps = {
	title: string;
	small?: boolean;
	opened: boolean;
	form?: ReactNode;
	inactive?: boolean;
	dispatch: Function;
};

export default function PopupContainer({
	title,
	opened,
	small = false,
	inactive = false,
	form,
	dispatch
}: PopupContainerProps) {
	const containerClasses = classNames(styles.container, { [styles.containerOpened]: opened });
	// console.log(form);
	
	return (
		<section
			className={classNames(styles.popup, {
				[styles.popupSmall]: small,
				[styles.inactive]: inactive,
				[styles.popupOpened]: opened,
			})}>
			<div className={containerClasses}>
				<header className={styles.header}>
					<h3 className={classNames(textStyles.titleBig, textStyles.noWrap)}>{title}</h3>
					<ButtonIcon label="Закрыть попап" auxClassNames={styles.close} handler={() => dispatch(popupClosed())} />
				</header>

				<div className={styles.popupContent}>
					<form className={styles.form}>{form}</form>
				</div>

				<Button title="Сохранить" auxStyles={styles.saveButton} clickHandler={() => {}} />
			</div>
		</section>
	);
}
