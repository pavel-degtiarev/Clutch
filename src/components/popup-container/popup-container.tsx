import React, { ReactNode } from "react";
import classNames from "classnames";
import ButtonIcon from "../button-icon/button-icon";
import { FormDisplayAction } from "../../context/form-display/form-display-state";

import styles from "./popup-container.module.scss";
import textStyles from "../../styles/typography.module.scss";

type PopupContainerProps = {
	title: string | undefined;
	form: ReactNode | undefined;
	small?: boolean;
	inactive?: boolean;
	closeAction: FormDisplayAction;
};

export default function PopupContainer({
	title, small = false, inactive = false, form, closeAction }: PopupContainerProps) {

	const opened = !!form;
	const containerClasses = classNames(styles.container, { [styles.containerOpened]: opened });

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
					<ButtonIcon
						label="Закрыть попап"
						auxClassNames={styles.close}
						handler={() => closeAction()}
					/>
				</header>
					
					{form}

			</div>
		</section>
	);
}
