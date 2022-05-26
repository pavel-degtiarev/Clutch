import classNames from "classnames";
import * as React from "react";
import styles from "./rollup.module.scss";

export type RollupItem = {
	title: string;
	callback: Function;
};

type RollupProps = {
	isActive: boolean;
	clickHandler: Function;
	items: RollupItem[];
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

export default function Rollup({ items, isActive, clickHandler }: RollupProps) {
	return (
		<div className={classNames(styles.rollup, { [styles.rollupActive]: isActive })}>
			<div className={styles.container}>
				<div className={styles.content}>
					{items.map((item, index) => {
						return (
							<RollupItem
								key={index}
								title={item.title}
								clickHandler={() => {
									clickHandler();
									item.callback();
								}}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
