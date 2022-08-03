import _ from "lodash";
import dayjs from "dayjs";
import { getOldestDate, loadAllByDateIndex, loadFirstByDate } from "../../API/access-db";
import { dbStoreName } from "../../API/init-db";
import { FuelFormFinalState } from "../../HOC/with-validate-check/check-form";
import { clearFuelStat, setFuelStat, StatRecord } from "../../store/stat-slice/stat-slice";
import { ClutchStoreType } from "../../store/store";
import TileController from "../tile-controller/tile-controller";

// ========================

export default class FuelTileController extends TileController {
  dbName: dbStoreName;

  constructor(store: ClutchStoreType) {
    super("Расход топлива", "л./100 км.", store);
    this.dbName = dbStoreName.FUEL;
  }

  // ======================

  async initController(): Promise<void> {
    this.dispatch(clearFuelStat());
    const now = dayjs().startOf(this.timeInterval);
    
    // если в нужном сторе нет данных, старейшая дата будет 0
    // ничего не заполняем, просто выходим
    const oldest = await getOldestDate(this.dbName);
    if (oldest === 0) return;

    const initDate = dayjs(oldest);
    let timeStart = initDate.startOf(this.timeInterval);
    let timeEnd = initDate.endOf(this.timeInterval);

    while (timeStart.isSameOrBefore(now)) {
      
      const statRecord = await this.createStatRecord(timeStart, timeEnd);
      if (statRecord) this.dispatch(setFuelStat(statRecord));

      timeStart = timeEnd.add(1, this.timeInterval).startOf(this.timeInterval);
      timeEnd = timeStart.endOf(this.timeInterval);
    }

    this.tile = this.setTileLegend(this.store.getState().stat.fuelStat);

    // если timeInterval был изменен, контроллер инициализируется заново
    // и состояние Tiles обновляется
    this.onUpdateCallback && this.onUpdateCallback();
  }

  // ======================

  async createStatRecord(start: dayjs.Dayjs, end: dayjs.Dayjs): Promise<StatRecord | undefined> {
    const refuelsInPeriod = await loadAllByDateIndex<FuelFormFinalState>(
      this.dbName, start.valueOf(), end.valueOf());

    // если за этот период нет записей, возвращаем пустой объект
    if (refuelsInPeriod.length === 0) return { timestamp: start.valueOf(), value: 0 };

    // чтобы правильно посчитать расход, необходимо знать
    // пробег при первой заправке следующего месяца
    const nextMonthStart = end.add(1, "day").startOf("month");
    const nextMonthEnd = nextMonthStart.endOf("month");
    const auxData = await loadFirstByDate<FuelFormFinalState>(
      this.dbName, nextMonthStart.valueOf(), nextMonthEnd.valueOf());

    // если данных за следующий месяц еще нет, auxData = undefined
    if (auxData) refuelsInPeriod.push(auxData);
    
    // если всего одна запись о заправке, берем просто пробег из этой записи
    const run = (refuelsInPeriod.length === 1)
      ? refuelsInPeriod[0].fuelRun
      : refuelsInPeriod[refuelsInPeriod.length - 1].fuelRun - refuelsInPeriod[0].fuelRun;
    const fuelSum = refuelsInPeriod.slice(0, -1).reduce((acc, item) => (acc += item.fuelVolume), 0);

    return {
      timestamp: start.valueOf(),
      value: Math.round((fuelSum * 1000) / run) / 10,
    };
  }

  // ======================

  async update(timestamp: number) {
    const initDate = dayjs(timestamp);
    let timeStart = initDate.startOf(this.timeInterval);
    let timeEnd = initDate.endOf(this.timeInterval);

    const statRecord = await this.createStatRecord(timeStart, timeEnd);
    if (statRecord) this.dispatch(setFuelStat(statRecord));

    this.tile = this.setTileLegend(this.store.getState().stat.fuelStat);
    this.onUpdateCallback && this.onUpdateCallback();
  }
}
