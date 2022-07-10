import React, { ReactNode } from "react";

import classNames from "classnames";
import styles from "./details-list.module.scss";
import textStyles from "../../styles/typography.module.scss";
import Button from "../button/button";

interface DetailsListProps {
	headers: string[];
	children: ReactNode;
	addRowHandler: () => void;
}

export default function DetailsList({ headers, children, addRowHandler }: DetailsListProps) {
	return (
		<div className={styles.detailsList}>
			<div className={classNames(textStyles.titleSmall, styles.row, styles.header)}>
				<p className={classNames(textStyles.noWrap, styles.title)}>{headers[0]}</p>
				<p className={styles.price}>{headers[1]}</p>
			</div>

			<div className={styles.body}>
				{children}

				<div className={styles.row}>
					<Button auxStyles={styles.addDetailsButton} clickHandler={() => addRowHandler()} />
				</div>
			</div>
		</div>
	);
}

export { styles as detailsListStyles };
