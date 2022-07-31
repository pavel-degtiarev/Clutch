import React, { useContext, useEffect } from "react";
import Tab from "./tab";
import { TabsContext } from "./tabs-group-context";

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

  const [tabGroupState, setTabgroupState] = useContext(TabsContext);
  useEffect(() => changedHandler(tabGroupState), [tabGroupState]);

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
            onCheck={setTabgroupState}
            themeOnLight={themeOnLight}
          />
        );
      })}
    </section>
  );
}
