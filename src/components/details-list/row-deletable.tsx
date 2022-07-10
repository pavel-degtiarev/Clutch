import React, { ReactNode } from "react";
import ButtonIcon from "../button-icon/button-icon";
import styles from "./details-list.module.scss";

interface RowProps {
  children: ReactNode;
  deleteHandler: () => void;
}

export function RowDeletable({ children, deleteHandler }: RowProps) {
	return (
		<div className={styles.row} draggable="true">
			{children}

			<ButtonIcon auxClassNames={styles.deleteRowButton} handler={() => deleteHandler()} />
		</div>
	);
}
