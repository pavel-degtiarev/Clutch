import * as React from "react";
import Tile from "../../components/tile/tile";
import { TileData } from "../../controllers/tiles-controller/tiles-controller";

import styles from "./tiles.module.scss";

interface TilesProps {
  tilesData: TileData[];
}

export default function Tiles({ tilesData }: TilesProps) {
  return (
    <section className={styles.tiles}>
      {tilesData.map((tile) => (
        <Tile
          key={tile.title}
          title={tile.title}
          units={tile.units}
          value={tile.value}
          chartData={tile.chartData}
        />
      ))}
    </section>
  );
}
