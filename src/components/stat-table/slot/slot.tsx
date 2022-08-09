import React from "react";
import styles from "./slot.module.scss";
import SlotHeader from "./slot-header";
import SlotRow from "./slot-row";
import { StatSlot } from "../slot-types";

type TableSlotProps = StatSlot;

export default function TableSlot({ header, rows }: TableSlotProps) {
  return (
    <div className={styles.slot}>
      <SlotHeader header={header} />
      {rows.map((row, index) => (
        <SlotRow title={row.title} value={row.value} key={index} />
      ))}
    </div>
  );
}
