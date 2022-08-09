import React from "react";
import classNames from "classnames";

import styles from "./slot.module.scss";
import typoStyles from "../../../styles/typography.module.scss";
import { SlotRowData } from "../slot-types";

type SlotRowProps = SlotRowData;

export default function SlotRow({ title, value }: SlotRowProps) {
  return (
    <div className={styles.row}>
      <p className={classNames(styles.title, typoStyles.noWrap)}>{title}</p>
      <p className={styles.value}>{value ? value : "\u2014"}</p>
    </div>
  );
}
