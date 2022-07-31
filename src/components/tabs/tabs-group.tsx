import React, { createContext, useEffect, useState } from "react";
import Tab from "./tab";

import styles from "./tabs-group.module.scss";

export interface TabInfo {
  id: string;
  title: string;
}

type TabsGroupProps = {
  name: string;
  tabs: TabInfo[];
  changedHandler: (tabId: string) => void;
  themeOnLight?: boolean;
};

export default function TabsGroup({
  name, tabs, changedHandler, themeOnLight = false }: TabsGroupProps) {

  const [tabGroupValue, setTabGroupValue] = useState(tabs[0].id);
  useEffect(() => changedHandler(tabGroupValue), [tabGroupValue]);

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
            onCheck={setTabGroupValue}
            themeOnLight={themeOnLight}
          />
        );
      })}
    </section>
  );
}
