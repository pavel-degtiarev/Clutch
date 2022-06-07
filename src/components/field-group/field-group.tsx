import classNames from "classnames";
import React, { ReactNode } from "react";

import styles from "./field-group.module.scss";

type FieldGroupProps = {
	horizontal?: boolean;
	children: ReactNode;
};

export default function FieldGroup({ horizontal = false, children }: FieldGroupProps) {
	const groupStyles = classNames(styles.fieldGroup, { [styles.fieldGroupHorizontal]: horizontal });
	return <div className={groupStyles}>{children}</div>;
}
