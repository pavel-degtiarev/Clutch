import React, { useContext } from "react";
import { StatTabs, timeTabs } from "../../general/global.var";
import TabsWithContext, { TabsContext } from "../../components/tabs/tabs-group-context";
import { TabInfo } from "../../components/tabs/tabs-group";
import TilesStat from "../tiles/tiles-stat";
import StatTable from "../../components/stat-table/stat-table";

import FormDisplayState from "../../context/form-display/form-display-state";
import Popups from "../../components/popups/popups";
import RawTable from "../../components/stat-table/raw-table";
import FormState from "../../context/form-state/form-state";

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
  const currentStatTab = useContext(TabsContext);

  return currentStatTab.id === StatTabs.STAT ? (
    <>
      <TilesStat />
      <TabsWithContext name="time-interval" tabInfo={timeTabs}>
        <StatTable />
      </TabsWithContext>
    </>
  ) : (
    <>
      <FormState>
        <FormDisplayState>
          <RawTable />
          <Popups />
        </FormDisplayState>
      </FormState>
    </>
  );
}
