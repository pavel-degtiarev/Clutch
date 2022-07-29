import dayjs from "dayjs";
import { StatRecord } from "../../store/stat-slice/stat-slice";
import { ClutchStoreDispatch, ClutchStoreType } from "../../store/store";
import { TileData } from "../tiles-controller/tiles-controller";

export type OnUpdateCallback = () => void;

// ======================

export default abstract class TileController {
  tile: TileData;
  store: ClutchStoreType;
  dispatch: ClutchStoreDispatch;
  onUpdateCallback: OnUpdateCallback | undefined;

  constructor(title: string, units: string, store: ClutchStoreType) {
    this.tile = { title: title, units: units, value: 0, chartData: [] };
    this.store = store;
    this.dispatch = store.dispatch;
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
        const zeros = new Array(6 - chartData.length).fill(0);
        chartData = zeros.concat(chartData);
        break;
    }

    return { ...this.tile, value: currentMonthStat.value, chartData: chartData };
  }

  abstract initController(): void;
  abstract update(timestamp: number): void;
  abstract createStatRecord(periodStart: dayjs.Dayjs, periodEnd: dayjs.Dayjs): Promise<StatRecord | undefined>;

  addOnUpdateCallback(callback: OnUpdateCallback) {
    this.onUpdateCallback = callback;
  };
}
