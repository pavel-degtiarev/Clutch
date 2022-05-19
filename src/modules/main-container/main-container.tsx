import * as React from "react";
import styles from "./styles/main-container.scss";

export default function Main({ children }: any) {
	return (
		<main>
				<div className={styles.container}>{children}</div>
		</main>
	);
}
