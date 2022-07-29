import _ from "lodash";
import dayjs from "dayjs";
import { getOldestDate, loadAllByDateIndex, loadFirstByDateIndex } from "../../API/access-db";
import { dbStoreName } from "../../API/init-db";
import { FuelFormFinalState } from "../../HOC/with-validate-check/check-form";
import { setFuelStat, StatRecord } from "../../store/stat-slice/stat-slice";
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
    const now = dayjs().startOf("month");

    // если в нужном сторе нет данных, старейшая дата будет 0
    // ничего не заполняем, просто выходим
    const oldest = await getOldestDate(this.dbName);
    if (oldest === 0) return;

    const initDate = dayjs(oldest);
    let monthStart = initDate.startOf("month");
    let monthEnd = initDate.endOf("month");

    while (monthStart.isSameOrBefore(now)) {
      const statRecord = await this.createStatRecord(monthStart, monthEnd);
      if (statRecord) this.dispatch(setFuelStat(statRecord));

      monthStart = monthStart.add(1, "month");
      monthEnd = monthEnd.add(1, "month");
    }

    this.tile = this.setTileLegend(this.store.getState().stat.fuelStat);
  }

  // ======================

  async createStatRecord(start: dayjs.Dayjs, end: dayjs.Dayjs): Promise<StatRecord | undefined> {
    const refuelsInPeriod = await loadAllByDateIndex<FuelFormFinalState>(
      this.dbName, start.valueOf(), end.valueOf());

    // если за этот период нет записей, пропускаем
    if (!refuelsInPeriod) return;

    // чтобы правильно посчитать расход, необходимо знать
    // пробег при первой заправке следующего месяца
    const auxData = await loadFirstByDateIndex<FuelFormFinalState>(
      this.dbName, start.add(1, "month").valueOf(), end.add(1, "month").valueOf());

    // если данных за следующий месяц еще нет, auxData = undefined
    if (auxData) refuelsInPeriod.push(auxData);

    const run = refuelsInPeriod[refuelsInPeriod.length - 1].fuelRun - refuelsInPeriod[0].fuelRun;
    const fuelSum = refuelsInPeriod.slice(0, -1).reduce((acc, item) => (acc += item.fuelVolume), 0);

    return {
      timestamp: start.valueOf(),
      value: Math.round((fuelSum * 1000) / run) / 10,
    };
  }

  // ======================

  async update(timestamp: number) {
    const initDate = dayjs(timestamp);
    let monthStart = initDate.startOf("month");
    let monthEnd = initDate.endOf("month");

    const statRecord = await this.createStatRecord(monthStart, monthEnd);
    if (statRecord) this.dispatch(setFuelStat(statRecord));
    
    this.tile = this.setTileLegend(this.store.getState().stat.fuelStat);
  }
}
