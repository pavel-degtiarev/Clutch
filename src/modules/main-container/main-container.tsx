import React, { ReactNode } from "react";
import styles from "./styles/main-container.module.scss";

type MainProps = {
	children: ReactNode;
};

export default function Main({ children }: MainProps) {
	return (
		<main>
			<div className={styles.container}>{children}</div>
		</main>
	);
}
