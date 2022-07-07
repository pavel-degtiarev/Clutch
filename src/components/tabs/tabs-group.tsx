import React, { createContext, useEffect, useState } from "react";
import Tab from "./tab";

import styles from "./tabs-group.module.scss";

type TabsGroupProps = {
	name: string;
	tabs: {
		id: string;
		title: string;
	}[];
	changedHandler: (tabId: string) => void;
	themeOnLight?: boolean;
};

type ContextType = {
	tabGroupValue: string;
	setTabGroupValue: (newCurrent: string) => void;
};

export const TabsGroupValue = createContext<ContextType>({
	tabGroupValue: "",
	setTabGroupValue: () => {},
});

export default function TabsGroup({ name, tabs, changedHandler, themeOnLight = false }: TabsGroupProps) {
	const [tabGroupValue, setTabGroupValue] = useState(tabs[0].id);
	useEffect(() => {
		changedHandler(tabGroupValue);
	}, [tabGroupValue]);

	return (
		<TabsGroupValue.Provider value={{ tabGroupValue, setTabGroupValue }}>
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
							themeOnLight={themeOnLight}
						/>
					);
				})}
			</section>
		</TabsGroupValue.Provider>
	);
}
