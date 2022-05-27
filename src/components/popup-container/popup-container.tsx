import React, { ReactNode } from "react";
import classNames from "classnames";
import ButtonIcon from "../button-icon/button-icon";

import styles from "./popup-container.module.scss";
import textStyles from "../../styles/typography.module.scss";
import Button from "../button/button";

type PopupContainerProps = {
	title: string;
	small?: boolean;
	children?: ReactNode;
};

export default function PopupContainer({ title, small = false, children }: PopupContainerProps) {
	return (
		<section className={classNames(styles.popup, { [styles.popupSmall]: small })}>
			<div className={styles.container}>
				<header className={styles.header}>
					<h3 className={classNames(textStyles.titleBig, textStyles.noWrap)}>{title}</h3>
					<ButtonIcon label="Закрыть попап" auxClassNames={styles.close} handler={() => {}} />
				</header>

				{children}

				<Button title="Сохранить" auxStyles={styles.saveButton} clickHandler={() => {}} />
			</div>
		</section>
	);
}
