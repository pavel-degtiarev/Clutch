import * as React from "react";
import Tab from "./tab";

import styles from "./tabs-group.module.scss";

type TabsGroupProps = {
	name: string;
	tabs: {
		id: string;
		title: string;
	}[];
	tabClickedHandler: (tabId: string) => void;
};

export default function TabsGroup({ name, tabs, tabClickedHandler }: TabsGroupProps) {
	return (
		<section className={styles.tabs}>
			{tabs.map((item, index) => {
				const isChecked = index === 0;
				return (
					<Tab
						key={index}
						name={name}
						title={item.title}
						id={item.id}
						checked={isChecked}
						clickHandler={tabClickedHandler}
					/>
				);
			})}
		</section>
	);
}
