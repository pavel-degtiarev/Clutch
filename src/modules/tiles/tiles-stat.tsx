import React from "react";
import classNames from "classnames";
import useStatTiles from "../../hooks/use-stat-tiles";
import TileStat from "../../components/tile/tile-stat";

import statStyles from "./tiles-stat.module.scss";
import styles from "../tiles/tiles.module.scss";

export default function TilesStat() {
  const tilesData = useStatTiles();

  return (
    <section className={classNames(styles.tiles, statStyles.tiles)}>
      {tilesData.map((tile) => (
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
