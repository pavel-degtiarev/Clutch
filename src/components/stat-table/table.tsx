import React from "react";
import { FinalBasicFormsState } from "../../HOC/with-validate-check/check-form";
import { StatSlot } from "./slot-types";
import TableSlot from "./slot/slot";
import styles from "./stat-table.module.scss";

interface TableProps {
  slots: StatSlot[];
  slotEditHandler: (formData: FinalBasicFormsState) => void;
}

export default function Table({ slots, slotEditHandler }: TableProps) {
  return (
    <section className={styles.statTable}>
      {slots.map((slot, index) => (
        <TableSlot
          key={index}
          header={slot.header}
          rows={slot.rows}
          slotEditHandler={slotEditHandler}
        />
      ))}
    </section>
  );
}
