import React from "react";
import Tab from "./tab";

import styles from "./tabs-group.module.scss";

export interface TabInfo {
  id: string;
  title: string;
}

type TabsGroupProps = {
  name: string;
  tabs: TabInfo[];
  changedHandler: (tab: TabInfo) => void;
  themeOnLight?: boolean;
};

export default function TabsGroup({
  tabs,
  name,
  changedHandler,
  themeOnLight = false,
}: TabsGroupProps) {
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
            onCheck={() => changedHandler(item)}
            themeOnLight={themeOnLight}
          />
        );
      })}
    </section>
  );
}
