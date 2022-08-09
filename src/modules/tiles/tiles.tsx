import React, { useCallback, useContext, useEffect, useState } from "react";
import { TabsContext } from "../../components/tabs/tabs-group-context";
import Tile from "../../components/tile/tile";
import { TilesController } from "../../controllers/tiles-controller/tiles-controller";
import { TimeInterval } from "../../general/global.var";

import styles from "./tiles.module.scss";

interface TilesProps {
  tilesController: TilesController;
}

export default function Tiles({ tilesController }: TilesProps) {
  const currentTab = useContext(TabsContext).id as TimeInterval;
  
  const [statData, setStatData] = useState(tilesController.tiles);
  const statChanged = useCallback(() => setStatData(tilesController.tiles), []);

  // при монтировании Tiles добавляем коллбэк в контроллер,
  // при размонтировании - удаляем
  useEffect(() => {
    tilesController.setOnUpdateCallback(statChanged);
    return () => tilesController.setOnUpdateCallback(null);
  }, []);

  useEffect(() => tilesController.setTimeInterval(currentTab), [currentTab]);

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
