import React from "react";
import classNames from "classnames";
import TileChart from "./tile-chart";
import TileStatHeader from "./tile-stat-header";
import { StatTileData } from "../../modules/tiles/tiles-stat";

import styles from "./tile.module.scss";

type TileProps = StatTileData;

export default function TileStat({ title, units, chartData }: TileProps) {

  return (
    <div className={classNames(styles.tile, styles.tileStat)}>
      <TileStatHeader title={title} units={units} />
      <TileChart chartData={chartData} />
    </div>
  );
}
