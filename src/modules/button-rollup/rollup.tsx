import * as React from "react";
import classNames from "classnames";
import { formSelected, rollupToggled } from "../../components/popup-switch/popup-switch-actions";
import styles from "./rollup.module.scss";

export type RollupItem = {
	title: string;
	form: React.ReactNode;
};

type RollupProps = {
	items: RollupItem[];
	isOpened: boolean;
	dispatch: Function;
};

type RollupItemProps = {
	title: string;
	clickHandler: Function;
};

function RollupItem({ title, clickHandler }: RollupItemProps) {
	return (
		<div className={styles.item} onClick={() => clickHandler()}>
			{title}
		</div>
	);
}

export default function Rollup({ items, isOpened, dispatch }: RollupProps) {
	return (
		<div className={classNames(styles.rollup, { [styles.rollupActive]: isOpened })}>
			<div className={styles.container}>
				<div className={styles.content}>
					{items.map((item, index) => {
						return (
							<RollupItem
								key={index}
								title={item.title}
								clickHandler={() => {
									dispatch(rollupToggled());
									dispatch(formSelected({ title: item.title, form: item.form }))
								}}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
