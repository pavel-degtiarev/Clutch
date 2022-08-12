import React from "react";
import { FinalBasicFormsStateWithID } from "../../HOC/with-validate-check/check-form";
import { StatSlot } from "./slot-types";
import TableSlot from "./slot/slot";
import styles from "./stat-table.module.scss";

interface TableProps {
  slots: StatSlot[];
  slotEditHandler?: (formData: FinalBasicFormsStateWithID) => void;
  rowsDeletable?: boolean;
}

export default function Table({
  slots,
  slotEditHandler = () => {},
  rowsDeletable = false,
}: TableProps) {
  return (
    <section className={styles.statTable}>
      {slots.map((slot, index) => (
        <TableSlot
          key={index}
          header={slot.header}
          rows={slot.rows}
          slotEditHandler={slotEditHandler}
          rowDeletable={rowsDeletable}
        />
      ))}
    </section>
  );
}
