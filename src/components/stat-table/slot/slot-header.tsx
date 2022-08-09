import React from "react";
import classNames from "classnames";

import styles from "./slot.module.scss";

interface SlotHeaderProps {
  header: string;
}

export default function SlotHeader({ header }: SlotHeaderProps) {
  return (
    <div className={classNames(styles.row)}>
      <h3 className={styles.header}>{header}</h3>
    </div>
  );
}
