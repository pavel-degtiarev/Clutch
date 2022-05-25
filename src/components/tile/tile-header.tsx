import * as React from "react";
import classNames from "classnames";

import tileStyles from "./tile.module.scss";
import styles from "./tile-header.module.scss";
import textStyles from "../../styles/typography.module.scss";

type TileHeaderProps = {
  title: string;
  units: string;
  value: number;
};

export default function TileHeader({ title, units, value }: TileHeaderProps) {
  return (
		<div className={classNames(tileStyles.data, styles.info)}>
			<h3 className={classNames(textStyles.titleNormal, styles.header)}>
				{title}&ensp;
				<br />
				<span className={classNames(textStyles.textSmall, styles.units)}>{units}</span>
			</h3>
			<div className={classNames(textStyles.titleHuge, styles.value)}>{value}</div>
		</div>
	);
}
