import React, { ReactNode } from "react";
import styles from "./details-list.module.scss";

interface RowProps{
  children: ReactNode;
}

export function Row({ children }: RowProps) {
  return <div className={styles.row}>
    {children}
  </div>;
}
