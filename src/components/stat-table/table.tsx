import React from "react";
import { FinalBasicFormsStateWithID } from "../../HOC/with-validate-check/check-form";
import { StatSlot } from "./slot-types";
import TableSlot from "./slot/slot";
import styles from "./stat-table.module.scss";

interface TableProps {
  slots: StatSlot[];
  slotEditHandler?: (formData: FinalBasicFormsStateWithID) => void;
  slotDeleteHandler?: (formData: FinalBasicFormsStateWithID) => void;
  rowsDeletable?: boolean;
}

export default function Table({
  slots,
  slotEditHandler = () => {},
  slotDeleteHandler = () => {},
  rowsDeletable = false,
}: TableProps) {
  return (
    <section className={styles.statTable}>
      {slots.map((slot) => (
        <TableSlot
          key={slot.header}
          header={slot.header}
          rows={slot.rows}
          slotEditHandler={slotEditHandler}
          slotDeleteHandler={slotDeleteHandler}
          rowDeletable={rowsDeletable}
        />
      ))}
    </section>
  );
}
