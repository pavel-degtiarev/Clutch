import React, { ReactNode } from "react";

import classNames from "classnames";
import Button from "../button/button";
import textStyles from "../../styles/typography.module.scss";
import styles from "./details-list.module.scss";
import { Row } from "./row";

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

				<Row>
					<Button auxStyles={styles.addDetailsButton} clickHandler={() => addRowHandler()} />
				</Row>
			</div>
		</div>
	);
}

export { styles as detailsListStyles };
