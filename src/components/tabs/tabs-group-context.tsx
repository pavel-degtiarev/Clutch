import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { TabInfo } from "./tabs-group";

interface TabsGroupContextProps {
  tabInfo: TabInfo[];
  children: ReactNode;
}

type ContextState<T> = [T, Dispatch<SetStateAction<T>>];
interface TabsContext {
  tabInfo: TabInfo[];
  contextState: ContextState<string>;
}

export const TabsContext = createContext<TabsContext>(
  { tabInfo: [], contextState: ["", () => { }] }
);

export default function TabsGroupContext({ tabInfo, children }: TabsGroupContextProps) {
  const [tabGroupState, setTabGroupState] = useState(tabInfo[0].id);

  return (
    <TabsContext.Provider
      value={{ tabInfo: tabInfo, contextState: [tabGroupState, setTabGroupState] }}>
      {children}
    </TabsContext.Provider>
  );
}
