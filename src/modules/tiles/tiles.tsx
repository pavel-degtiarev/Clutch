import React, { useCallback, useEffect, useState } from "react";
import Tile from "../../components/tile/tile";
import { TilesController } from "../../controllers/tiles-controller/tiles-controller";

import styles from "./tiles.module.scss";

interface TilesProps {
  tilesController: TilesController;
}

export default function Tiles({ tilesController }: TilesProps) {

  const [statData, setStatData] = useState(tilesController.tiles);
  const statChanged = useCallback(() => setStatData(tilesController.tiles), []);

  useEffect(() => {
    tilesController.setOnUpdateCallback(statChanged);
    return () => tilesController.setOnUpdateCallback(null);
  }, []);

  return (
    <section className={styles.tiles}>
      {statData.map((tile) => (
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
