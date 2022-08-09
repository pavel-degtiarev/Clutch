import React, { useContext } from "react";
import { StatTabs, timeTabs } from "../../general/global.var";
import TabsGroupContext, { TabsContext } from "../../components/tabs/tabs-group-context";
import TabsGroup, { TabInfo } from "../../components/tabs/tabs-group";
import TilesStat from "../tiles/tiles-stat";
import StatTable from "../../components/stat-table/stat-table";

import { statTableData } from "../../mocks/stat-table";

const statTabs: TabInfo[] = [
  { id: StatTabs.STAT, title: "Статистика" },
  { id: StatTabs.LIST, title: "Затраты списком" },
];

export default function PageStats() {
  return (
    <>
      <TabsGroupContext tabInfo={statTabs}>
        <TabsGroup name="tab-stat" />
        <StatsContainer />
      </TabsGroupContext>
    </>
  );
}

function StatsContainer() {
  const { contextState } = useContext(TabsContext);
  return contextState[0] === StatTabs.STAT ? (
    <>
      <TilesStat />

      <TabsGroupContext tabInfo={timeTabs}>
        <TabsGroup name="time-interval" />
        <StatTable slots={statTableData} />
      </TabsGroupContext>
    </>
  ) : (
    <>RAW LIST</>
  );
}
