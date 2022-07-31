import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { TabInfo } from "./tabs-group";

interface TabsGroupContextProps {
  tabInfo: TabInfo[];
  children: ReactNode;
}

type ContextState<T> = [T, Dispatch<SetStateAction<T>>];

export const TabsContext = createContext<ContextState<string>>(["", () => {}]);

export default function TabsGroupContext({ tabInfo, children }: TabsGroupContextProps) {
  const [tabGroupState, setTabgroupState] = useState(tabInfo[0].id);
  return (
    <TabsContext.Provider value={[tabGroupState, setTabgroupState]}>
      {children}
    </TabsContext.Provider>
  );
}
