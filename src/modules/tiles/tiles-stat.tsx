import React from "react";
import classNames from "classnames";

import { TileData } from "../../controllers/tiles-controller/tiles-controller";

import statStyles from "./tiles-stat.module.scss";
import styles from "../tiles/tiles.module.scss";
import TileStat from "../../components/tile/tile-stat";

export type StatTileData = Omit<TileData, "value">;

const statTilesData: StatTileData[] = [
  {
    title: "Пробег",
    units: "км.",
    chartData: [230, 120, 180, 200, 260, 210, 190, 150, 174, 156, 185, 200],
  },
  {
    title: "Расход топлива",
    units: "л./км.",
    chartData: [7.2, 7.7, 7.8, 7.4, 8.2, 8, 7.6, 7.2, 7.7, 7.1, 7.5, 7.4],
  },
  {
    title: "Затраты",
    units: "руб.",
    chartData: [3500, 1000, 1500, 4500, 2000, 8465, 145, 5880, 652, 452, 1100, 1000],
  },
];

export default function TilesStat() {
  return (
    <section className={classNames(styles.tiles, statStyles.tiles)}>
      {statTilesData.map((tile) => (
        <TileStat
          key={tile.title}
          title={tile.title}
          units={tile.units}
          chartData={tile.chartData}
        />
      ))}
    </section>
  );
}
