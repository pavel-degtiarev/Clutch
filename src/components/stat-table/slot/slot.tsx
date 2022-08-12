import React, { ReactNode } from "react";
import styles from "./slot.module.scss";
import SlotHeader from "./slot-header";
import SlotRow from "./slot-row";
import { StatSlot } from "../slot-types";
import { FinalBasicFormsStateWithID } from "../../../HOC/with-validate-check/check-form";
import { RowDeletable } from "../../details-list/row-deletable";

interface RowProps {
  deletable: boolean;
  children: ReactNode;
  onDelete: () => void;
}

function Row({ deletable, onDelete, children }: RowProps) {
  return deletable ? (
    <>
      <RowDeletable deleteHandler={onDelete}>{children}</RowDeletable>
    </>
  ) : (
    <>{children}</>
  );
}

interface TableSlotProps extends StatSlot {
  slotEditHandler: (auxData: FinalBasicFormsStateWithID) => void;
  slotDeleteHandler: (auxData: FinalBasicFormsStateWithID) => void;
  rowDeletable: boolean;
}

export default function TableSlot({
  header,
  rows,
  slotEditHandler,
  slotDeleteHandler,
  rowDeletable,
}: TableSlotProps) {  
  return (
    <div className={styles.slot}>
      <SlotHeader header={header} />
      {rows.map((row, index) => (
        <Row
          deletable={rowDeletable}
          key={`${row.title}-${row.aux?.id}` || index}
          onDelete={() => row.aux && slotDeleteHandler(row.aux)}>
          <SlotRow
            title={row.title}
            value={row.value}
            clickHandler={() => row.aux && slotEditHandler(row.aux)}
          />
        </Row>
      ))}
    </div>
  );
}
