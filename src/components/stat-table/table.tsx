import React from "react";
import { StatSlot } from "./slot-types";
import TableSlot from "./slot/slot";
import styles from "./stat-table.module.scss";

interface TableProps {
  slots: StatSlot[];
}

export default function Table({ slots }: TableProps) {
  return (
    <section className={styles.statTable}>
      {slots.map((slot, index) => (
        <TableSlot key={index} header={slot.header} rows={slot.rows} />
      ))}
    </section>
  );
}
