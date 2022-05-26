import classNames from "classnames";
import * as React from "react";
import styles from "./rollup.module.scss";

type RollupProps = {
	active: boolean;
};

export default function Rollup({ active }: RollupProps) {
	return (
		<div className={classNames(styles.rollup, { [styles.rollupActive]: active })}>
			<div className={styles.container}>
				<div className={styles.content}>
					<div className={styles.item}>Топливо</div>
					<div className={styles.item}>Расходники, запчасти</div>
					<div className={styles.item}>Сервис</div>
					<div className={styles.item}>Прочее</div>
				</div>
			</div>
		</div>
	);
}
