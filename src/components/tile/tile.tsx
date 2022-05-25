import * as React from "react";
import TileHeader from "./tile-header";
import TileChart from "./tile-chart";
import { TileChartData } from "./tile.types";

import styles from "./tile.module.scss";


type TileProps = {
	title: string;
	units: string;
	value: number;
	chartData: TileChartData;
};

export default function Tile({ title, units, value, chartData }: TileProps) {
	return (
		<div className={styles.tile}>
			<TileHeader title={title} units={units} value={value} />
			<TileChart data={chartData} />
		</div>
	);
}
