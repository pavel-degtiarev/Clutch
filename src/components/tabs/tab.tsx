import * as React from "react";
import styles from "./tab.module.scss";
import globalStyles from "../../styles/global.module.scss";

type TabProps = {
	name: string;
	id: string;
	title: string;
	checked?: boolean;
	clickHandler: (tabId: string) => void;
};

export default function Tab({ name, id, title, checked, clickHandler }: TabProps) {
	const compoundID = `${name}-${id}`;
	return (
		<div className={styles.tabContainer}>
			<input
				className={globalStyles.visuallyHidden}
				type="radio"
				name={name}
				id={compoundID}
				value={id}
				defaultChecked={checked}
				onClick={() => clickHandler(id)}
			/>
			<label className={styles.tab} htmlFor={compoundID}>
				{title}
			</label>
		</div>
	);
}
