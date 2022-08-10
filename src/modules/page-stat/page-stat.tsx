import React, { useContext } from "react";
import { StatTabs, timeTabs } from "../../general/global.var";
import TabsWithContext, { TabsContext } from "../../components/tabs/tabs-group-context";
import { TabInfo } from "../../components/tabs/tabs-group";
import TilesStat from "../tiles/tiles-stat";
import StatTable from "../../components/stat-table/stat-table";

import { useSelector } from "react-redux";
import { ClutchStoreState } from "../../store/store";
import { Statistics } from "../../store/stat-slice/stat-slice";
import FormDisplayState from "../../context/form-display/form-display-state";
import Popups from "../../components/popups/popups";
import RawTable from "../../components/stat-table/raw-table";

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
  const statData = useSelector((state: ClutchStoreState) => state.stat as Statistics);

  return currentStatTab.id === StatTabs.STAT ? (
    <>
      <TilesStat stat={statData} />
      <TabsWithContext name="time-interval" tabInfo={timeTabs}>
        <StatTable stat={statData} />
      </TabsWithContext>
    </>
  ) : (
    <>
      <FormDisplayState>
        <RawTable />
        <Popups />
      </FormDisplayState>
    </>
  );
}
