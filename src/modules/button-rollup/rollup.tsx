import React, { useContext } from "react";
import classNames from "classnames";
import { FormDisplayContext } from "../../context/form-display/form-display-state";
import { FormItem } from "../../context/form-display/form-display-types";
import styles from "./rollup.module.scss";

type RollupProps = {
	forms: FormItem[];
	isOpened: boolean;
};

type RollupItemProps = {
	title: string;
	clickHandler: Function;
};

function RollupItem({ title, clickHandler }: RollupItemProps) {
	return (
		<div className={styles.item} onClick={() => clickHandler()}>
			{title}
		</div>
	);
}

export default function Rollup({ forms, isOpened }: RollupProps) {
	const {toggleRollup, showForm} = useContext(FormDisplayContext);
	return (
		<div className={classNames(styles.rollup, { [styles.rollupActive]: isOpened })}>
			<div className={styles.container}>
				<div className={styles.content}>
					{forms.map((item, index) => {
						return (
							<RollupItem
								key={index}
								title={item.title}
								clickHandler={() => {
									toggleRollup();
									showForm({ title: item.title, form: item.form })
								}}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
