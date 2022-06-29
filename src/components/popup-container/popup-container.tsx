import React, { createContext, MutableRefObject, ReactNode, useContext } from "react";
import classNames from "classnames";
import ButtonIcon from "../button-icon/button-icon";
import { DispatchContext } from "../popup-switch/popup-switch";
import { Action } from "../popup-switch/popup-switch.types";

import styles from "./popup-container.module.scss";
import textStyles from "../../styles/typography.module.scss";

type PopupContainerProps = {
	title: string | undefined;
	form: ReactNode | undefined;
	small?: boolean;
	inactive?: boolean;
	closeAction: () => Action;
};

export const FormContext = createContext({} as MutableRefObject<null>);

export default function PopupContainer({
	title, small = false, inactive = false, form, closeAction }: PopupContainerProps) {
	
	const opened = !!form;
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
						handler={() => dispatch(closeAction())}
					/>
				</header>
					
					{form}

			</div>
		</section>
	);
}
