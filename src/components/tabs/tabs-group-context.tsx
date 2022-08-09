import React, { createContext, ReactNode, useCallback, useState } from "react";
import TabsGroup, { TabInfo } from "./tabs-group";

interface TabsWithContextProps {
  tabInfo: TabInfo[];
  name: string;
  changedHandler?: (tabId: string) => void;
  themeOnLight?: boolean;

  children: ReactNode | ReactNode[];
}

export const TabsContext = createContext<TabInfo>({} as TabInfo);

export default function TabsWithContext({
  tabInfo,
  name,
  changedHandler,
  themeOnLight = false,
  children,
}: TabsWithContextProps) {

  const [tabGroupState, setTabGroupState] = useState(tabInfo[0]);
  const tabChangedHandler = useCallback(
    (tab: TabInfo) => {
      changedHandler && changedHandler(tab.id);
      setTabGroupState(tab);
    },
    [changedHandler]
  );

  return (
    <TabsContext.Provider value={tabGroupState}>
      <TabsGroup
        tabs={tabInfo}
        name={name}
        changedHandler={tabChangedHandler}
        themeOnLight={themeOnLight}
      />
      {children}
    </TabsContext.Provider>
  );
}
