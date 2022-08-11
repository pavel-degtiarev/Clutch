import React from "react";
import classNames from "classnames";

import styles from "./slot.module.scss";
import typoStyles from "../../../styles/typography.module.scss";
import { SlotRowData } from "../slot-types";

interface SlotRowProps extends SlotRowData {
  clickHandler: () => void;
}

export default function SlotRow({ title, value, clickHandler }: SlotRowProps) {
  return (
    <div className={styles.row} onClick={clickHandler}>
      <p className={classNames(styles.title, typoStyles.noWrap)}>{title}</p>
      <p className={styles.value}>{value ? value : "\u2014"}</p>
    </div>
  );
}
