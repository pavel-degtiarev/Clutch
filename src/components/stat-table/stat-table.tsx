import React, { useContext } from "react";
import useStatTable from "../../hooks/use-stat-table";
import { Statistics } from "../../store/stat-slice/stat-slice";
import { TabsContext } from "../tabs/tabs-group-context";
import Table from "./table";

interface StatTableProps {
  stat: Statistics;
}

export default function StatTable({ stat }: StatTableProps) {
  const timeIntervalTab = useContext(TabsContext);
  const slots = useStatTable(stat, timeIntervalTab);

  return slots.length > 0 ? <Table slots={slots} /> : null;
}
