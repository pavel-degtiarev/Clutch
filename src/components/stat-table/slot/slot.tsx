import React from "react";
import styles from "./slot.module.scss";
import SlotHeader from "./slot-header";
import SlotRow from "./slot-row";
import { StatSlot } from "../slot-types";
import { FinalBasicFormsState } from "../../../HOC/with-validate-check/check-form";

interface TableSlotProps extends StatSlot {
  slotEditHandler: (auxData: FinalBasicFormsState) => void;
}

export default function TableSlot({ header, rows, slotEditHandler }: TableSlotProps) {
  return (
    <div className={styles.slot}>
      <SlotHeader header={header} />
      {rows.map((row, index) => (
        <SlotRow
          title={row.title}
          value={row.value}
          key={index}
          clickHandler={() => row.aux && slotEditHandler(row.aux)}
        />
      ))}
    </div>
  );
}
