import classNames from "classnames";
import React, { ReactNode } from "react";
import styles from "../field.module.scss";

type FieldContainerProps = {
  auxStyles?: string;
  children: ReactNode;
};

export default function FieldContainer({ auxStyles, children }: FieldContainerProps) {
  return <div className={classNames(styles.field, auxStyles)}>{children}</div>;
}
