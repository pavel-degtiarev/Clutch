import React, { useContext } from "react";
import useStatTable from "../../hooks/use-stat-table";
import { Statistics } from "../../store/stat-slice/stat-slice";
import { TabsContext } from "../tabs/tabs-group-context";
import { StatSlot } from "./slot-types";
import TableSlot from "./slot/slot";

import styles from "./stat-table.module.scss";

interface StatTableProps {
  stat: Statistics;
}

export default function StatTable({ stat }: StatTableProps) {
  const timeIntervalTab = useContext(TabsContext);
  const slots = useStatTable(stat, timeIntervalTab);
  
  return slots.length > 0 ? (
    <section className={styles.statTable}>
      {slots.map((slot, index) => (
        <TableSlot key={index} header={slot.header} rows={slot.rows} />
      ))}
    </section>
  ) : null;
}
