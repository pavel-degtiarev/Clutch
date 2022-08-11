import React, { useContext } from "react";
import { useSelector } from "react-redux";
import useStatTable from "../../hooks/use-stat-table";
import { Statistics } from "../../store/stat-slice/stat-slice";
import { ClutchStoreState } from "../../store/store";
import { TabsContext } from "../tabs/tabs-group-context";
import Table from "./table";

export default function StatTable() {
  const statData = useSelector((state: ClutchStoreState) => state.stat as Statistics);
  const timeIntervalTab = useContext(TabsContext);
  const slots = useStatTable(statData, timeIntervalTab);

  return slots.length > 0 ? <Table slots={slots} /> : null;
}
