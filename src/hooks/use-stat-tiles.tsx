import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TileData } from "../controllers/tiles-controller/tiles-controller";
import { Statistics, StatRecord } from "../store/stat-slice/stat-slice";
import { ClutchStoreState } from "../store/store";

const HISTORY_LENGTH = 12;

export type StatTileData = Omit<TileData, "value">;

const runTileData: StatTileData = { title: "Пробег", units: "км.", chartData: [] };
const fuelTileData: StatTileData = { title: "Расход топлива", units: "л./км.", chartData: [] };
const expencesTileData: StatTileData = { title: "Затраты", units: "руб.", chartData: [] };

function fillStatTile(tilePlaceholder: StatTileData, storeData: StatRecord[]): StatTileData {
  let chartNewData = storeData.map((item) => item.value);

  switch (true) {
    case chartNewData.length > HISTORY_LENGTH:
      chartNewData = chartNewData.slice(-HISTORY_LENGTH);
      break;

    case chartNewData.length < HISTORY_LENGTH:
      const zeros = new Array(HISTORY_LENGTH - chartNewData.length).fill(0);
      chartNewData = zeros.concat(chartNewData);
      break;
  }

  return { ...tilePlaceholder, chartData: chartNewData };
}

// ============================================

export default function useStatTiles() {
  const statData = useSelector((state: ClutchStoreState) => state.stat as Statistics);
  const [tilesData, setTilesData] = useState([runTileData, fuelTileData, expencesTileData]);

  useEffect(
    () =>
      setTilesData([
        fillStatTile(runTileData, statData.runStat),
        fillStatTile(fuelTileData, statData.fuelStat),
        fillStatTile(expencesTileData, statData.expenceStat),
      ]),
    [statData]
  );

  return tilesData;
}
