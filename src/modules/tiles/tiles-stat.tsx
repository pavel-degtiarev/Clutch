import React from "react";
import classNames from "classnames";
import useStatTiles from "../../hooks/use-stat-tiles";
import TileStat from "../../components/tile/tile-stat";

import statStyles from "./tiles-stat.module.scss";
import styles from "../tiles/tiles.module.scss";
import { Statistics } from "../../store/stat-slice/stat-slice";
import { useSelector } from "react-redux";
import { ClutchStoreState } from "../../store/store";

export default function TilesStat() {
  const statData = useSelector((state: ClutchStoreState) => state.stat as Statistics);
  const tilesData = useStatTiles(statData);

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
