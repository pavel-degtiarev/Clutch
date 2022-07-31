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
  changedHandler?: (tabId: string) => void;
  themeOnLight?: boolean;
};

export default function TabsGroup({ name, changedHandler, themeOnLight = false }: TabsGroupProps) {
  const {
    tabInfo: tabInfo,
    contextState: [tabGroupState, setTabGroupState]
  } = useContext(TabsContext);

  return (
    <section className={styles.tabs}>
      {tabInfo.map((item, index) => {
        const isChecked = index === 0;
        return (
          <Tab
            key={index}
            name={name}
            title={item.title}
            id={item.id}
            checked={isChecked}
            onCheck={() => {
              setTabGroupState(item.id);
              changedHandler && changedHandler(item.id);
            }}
            themeOnLight={themeOnLight}
          />
        );
      })}
    </section>
  );
}
