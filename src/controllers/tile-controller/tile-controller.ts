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
    return { ...this.tile, value: currentMonthStat.value };
  }

  abstract initController(store: ClutchStoreType): void;
}
