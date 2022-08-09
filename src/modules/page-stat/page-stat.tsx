import React, { useContext } from "react";
import { StatTabs, timeTabs } from "../../general/global.var";
import TabsWithContext, { TabsContext } from "../../components/tabs/tabs-group-context";
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
      <TabsWithContext name="tab-stat" tabInfo={statTabs}>
        <StatsContainer />
      </TabsWithContext>
    </>
  );
}

function StatsContainer() {
  const  currentTab  = useContext(TabsContext);
  return currentTab.id === StatTabs.STAT ? (
    <>
      <TilesStat />

      <TabsWithContext name="time-interval" tabInfo={timeTabs}>
        <StatTable slots={statTableData} />
      </TabsWithContext>
    </>
  ) : (
    <>RAW LIST</>
  );
}
