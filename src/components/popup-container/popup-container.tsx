import React, { createContext, MutableRefObject, ReactNode, useContext } from "react";
import classNames from "classnames";
import ButtonIcon from "../button-icon/button-icon";
import { DispatchContext } from "../popup-switch/popup-switch";
import { popupClosed } from "../popup-switch/popup-switch-actions";

import styles from "./popup-container.module.scss";
import textStyles from "../../styles/typography.module.scss";

type PopupContainerProps = {
	title: string | undefined;
	opened: boolean;
	form: ReactNode | undefined;
	small?: boolean;
	inactive?: boolean;
};

export const FormContext = createContext({} as MutableRefObject<null>);

export default function PopupContainer({
	title, opened, small = false, inactive = false, form }: PopupContainerProps) {
	const containerClasses = classNames(styles.container, { [styles.containerOpened]: opened });
	const dispatch = useContext(DispatchContext);

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
						handler={() => dispatch(popupClosed())}
					/>
				</header>
					
					{form}

			</div>
		</section>
	);
}
