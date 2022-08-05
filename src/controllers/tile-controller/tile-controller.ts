import dayjs from "dayjs";
import { TimeInterval } from "../../general/app";
import { StatRecord } from "../../store/stat-slice/stat-slice";
import { ClutchStoreDispatch, ClutchStoreType } from "../../store/store";
import { TileData } from "../tiles-controller/tiles-controller";

// ======================

export default abstract class TileController {
  tile: TileData;
  store: ClutchStoreType;
  timeInterval: TimeInterval;
  dispatch: ClutchStoreDispatch;
  onUpdateCallback: OnUpdateCallback | null;

  constructor(title: string, units: string, store: ClutchStoreType) {
    this.tile = { title: title, units: units, value: 0, chartData: [] };
    this.store = store;
    this.dispatch = store.dispatch;
    this.onUpdateCallback = null;
    this.timeInterval = TimeInterval.MONTH;
  }

  setTileLegend(statStore: StatRecord[]): TileData {
    const currentMonthStat = statStore[statStore.length - 1];
    let chartData = statStore.map((item) => item.value);

    // если timeInterval = TimeInterval.MONTH,
    // то собираем статистику за 6 месяцев, иначе – за 3 года
    const historyLength = this.timeInterval === TimeInterval.MONTH ? 6 : 3;

    // нужны данные за полгода (statStore.length = 6).
    // если не хватает, в начало массива дописываем нули.
    // если много, берем последние 6 элементов.
    switch (true) {
      case chartData.length > historyLength:
        chartData = chartData.slice(-historyLength);
        break;

      case chartData.length < historyLength:
        const zeros = new Array(historyLength - chartData.length).fill(0);
        chartData = zeros.concat(chartData);
        break;
    }

    return { ...this.tile, value: currentMonthStat.value, chartData: chartData };
  }

  abstract initController(): void;
  abstract update(timestamp: number): void;
  abstract createStatRecord(periodStart: dayjs.Dayjs, periodEnd: dayjs.Dayjs): Promise<StatRecord | undefined>;

  setOnUpdateCallback(callback: OnUpdateCallback) {
    this.onUpdateCallback = callback;
  }

  clearController() {
    this.tile = { ...this.tile, value: 0, chartData: [] };
    this.onUpdateCallback && this.onUpdateCallback();
  }
}
