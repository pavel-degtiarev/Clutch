import * as React from "react";
import Tile from "../../components/tile/tile";
import { TileChartData } from "../../components/tile/tile.types";

import styles from "./tiles.module.scss";

type TilesProps = {
  runData: TileChartData;
  fuelData: TileChartData;
  expencesData: TileChartData;
};

export default function Tiles({ runData, fuelData, expencesData }: TilesProps) {
  return (
    <section className={styles.tiles}>
      <Tile title="Пробег" units="км." value={2700} chartData={runData} />
      <Tile title="Расход топлива" units="л./100 км." value={8.2} chartData={fuelData} />
      <Tile title="Затраты" units="руб." value={1200} chartData={expencesData} />
    </section>
  );
}
