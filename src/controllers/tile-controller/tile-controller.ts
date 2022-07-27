import { StatisticsFields, StatRecord } from "../../store/stat-slice/stat-slice";
import { ClutchStoreType } from "../../store/store";
import { TileData } from "../tiles-controller/tiles-controller";

// ======================

export default abstract class TileController<T extends StatisticsFields> {
  private _tileData: TileData;

  constructor(title: string, units: string) {
    this._tileData = { title: title, units: units, value: 0, chartData: [] };
  }

  set tile(newData: TileData) {
    this._tileData = newData;
  }

  get tile(): TileData {
    return this._tileData;
  }

  setTileLegend(statStore: StatRecord[]): TileData {
    const currentMonthStat = statStore[statStore.length - 1];
    let chartData = statStore.map((item) => item.value);
    
    // нужны данные за полгода (statStore.length = 6).
    // если не хватает, в начало массива дописываем нули.
    // если много, берем последние 6 элементов.
    switch (true) {
      case chartData.length > 6:
        chartData = chartData.slice(-6);
        break;
      
      case chartData.length < 6:
        const zeros = (new Array(6 - chartData.length)).fill(0);
        chartData = zeros.concat(chartData);
        break;
    }

    return { ...this.tile, value: currentMonthStat.value, chartData: chartData };
  }

  abstract initController(store: ClutchStoreType): void;
}
