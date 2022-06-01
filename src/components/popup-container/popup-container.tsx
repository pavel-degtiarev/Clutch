import React, { ReactNode, useRef } from "react";
import classNames from "classnames";
import ButtonIcon from "../button-icon/button-icon";
import Button from "../button/button";
import { popupClosed } from "../popup-switch/popup-switch-actions";
import { FormSubmitHandler } from "../popup-switch/popup-switch.types";

import styles from "./popup-container.module.scss";
import textStyles from "../../styles/typography.module.scss";

type PopupContainerProps = {
	title: string | undefined;
	opened: boolean;
	form: ReactNode | undefined;
	small?: boolean;
	inactive?: boolean;
	submit: FormSubmitHandler | undefined;
	dispatch: Function;
};

export default function PopupContainer({
	title, opened, small = false, inactive = false, form, submit, dispatch }: PopupContainerProps) {
	
	const containerClasses = classNames(styles.container, { [styles.containerOpened]: opened });
	const formRef = useRef(null);

	const submitForm = () => submit && formRef.current && submit(formRef.current);

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

				<div className={styles.popupContent}>
					<form className={styles.form} ref={formRef}>
						{form}
					</form>
				</div>

				<Button
					title="Сохранить"
					auxStyles={styles.saveButton}
					clickHandler={() => {
						if (submitForm()) dispatch(popupClosed());
					}}
				/>
			</div>
		</section>
	);
}
