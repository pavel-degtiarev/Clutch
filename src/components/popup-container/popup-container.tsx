import React, { ReactNode, useCallback, useEffect, useState } from "react";
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
	const [closed, setClosed] = useState(true);
	const containerClasses = classNames(styles.container, { [styles.containerClosed]: closed });

	useEffect(() => setClosed(false), []);
	const closePopup = useCallback(() => setClosed(true), []);
	
	return (
		<section className={classNames(styles.popup, { [styles.popupSmall]: small })}>
			<div className={containerClasses}>
				<header className={styles.header}>
					<h3 className={classNames(textStyles.titleBig, textStyles.noWrap)}>{title}</h3>
					<ButtonIcon label="Закрыть попап" auxClassNames={styles.close} handler={closePopup} />
				</header>

				{children}

				<Button title="Сохранить" auxStyles={styles.saveButton} clickHandler={closePopup} />
			</div>
		</section>
	);
}
