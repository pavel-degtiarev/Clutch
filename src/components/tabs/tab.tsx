import * as React from "react";
import styles from "./tab.module.scss";
import globalStyles from "../../styles/global.module.scss";
import { TabsGroupValue } from "./tabs-group";

type TabProps = {
	name: string;
	id: string;
	title: string;
	checked?: boolean;
};

export default function Tab({ name, id, title, checked }: TabProps) {
	const compoundID = `${name}-${id}`;
	// console.log(title);
	
	return (
		<TabsGroupValue.Consumer>
			{(context) => (
				<div className={styles.tabContainer}>
					<input
						className={globalStyles.visuallyHidden}
						type="radio"
						name={name}
						id={compoundID}
						value={id}
						defaultChecked={checked}
						onClick={() => {
							context.setTabGroupValue(id);
						}}
					/>
					<label className={styles.tab} htmlFor={compoundID}>
						{title}
					</label>
				</div>
			)}
		</TabsGroupValue.Consumer>
	);
}
