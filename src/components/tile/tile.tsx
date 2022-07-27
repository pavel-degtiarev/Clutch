import * as React from "react";
import TileHeader from "./tile-header";
import TileChart from "./tile-chart";
import { TileData } from "../../controllers/tiles-controller/tiles-controller";

import styles from "./tile.module.scss";

type TileProps = TileData;

export default function Tile({ title, units, value, chartData }: TileProps) {
  return (
    <div className={styles.tile}>
      <TileHeader title={title} units={units} value={value} />
      <TileChart chartData={chartData} />
    </div>
  );
}
