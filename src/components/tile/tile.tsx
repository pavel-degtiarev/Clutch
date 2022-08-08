import React, { useContext } from "react";
import TileHeader from "./tile-header";
import TileChart from "./tile-chart";
import { TileData } from "../../controllers/tiles-controller/tiles-controller";
import { CurrentPageContext } from "../../context/current-page/current-page-context";

import styles from "./tile.module.scss";

type TileProps = TileData;

export default function Tile({ title, units, value, chartData }: TileProps) {
  const { switchToStat } = useContext(CurrentPageContext);

  return (
    <div className={styles.tile} onClick={switchToStat}>
      <TileHeader title={title} units={units} value={value} />
      <TileChart chartData={chartData} />
    </div>
  );
}
