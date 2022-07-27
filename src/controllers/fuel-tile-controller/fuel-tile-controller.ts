import _ from "lodash";
import dayjs from "dayjs";
import { getOldestDate, loadAllByDateIndex, loadFirstByDateIndex } from "../../API/access-db";
import { dbStoreName } from "../../API/init-db";
import { FuelFormFinalState } from "../../HOC/with-validate-check/check-form";
import { fuelData } from "../../mocks/charts";
import { setFuelStat, StatRecord } from "../../store/stat-slice/stat-slice";
import { ClutchStoreDispatch, ClutchStoreType } from "../../store/store";
import TileController from "../tile-controller/tile-controller";

// ========================

export default class FuelTileController extends TileController<"fuelStat"> {
  constructor() {
    super("Расход топлива", "л./100 км.");
    this.tile.chartData = fuelData;
  }

  // ======================

  async initController(store: ClutchStoreType): Promise<void> {
    const dispatch: ClutchStoreDispatch = store.dispatch;
    const dbName = dbStoreName.FUEL;
    const now = dayjs().startOf("month");

    // если в нужном сторе нет данных, старейшая дата будет 0
    // ничего не заполняем, просто выходим
    const oldest = await getOldestDate(dbName);
    if (oldest === 0) return;

    const initDate = dayjs(oldest);
    let lowerBound = initDate.startOf("month");
    let upperBound = initDate.endOf("month");

    while (lowerBound.isSameOrBefore(now)) {
      const refuelPerMonth = await loadAllByDateIndex<FuelFormFinalState>(
        dbName, lowerBound.valueOf(), upperBound.valueOf());

      // если за этот месяц нет записей, пропускаем
      if (refuelPerMonth) {
        // чтобы правильно посчитать расход, необходимо знать
        // пробег при первой заправке следующего месяца
        const auxData = await loadFirstByDateIndex<FuelFormFinalState>(
          dbName, lowerBound.add(1, "month").valueOf(), upperBound.add(1, "month").valueOf());

        // если обрабатываем текущий месяц, данных за следующий еще нет
        // auxData = undefined
        if (auxData) refuelPerMonth.push(auxData);

        const monthFuelStatRecord = this.createFuelStatRecord(lowerBound.valueOf(), refuelPerMonth);
        dispatch(setFuelStat(monthFuelStatRecord));
      }

      lowerBound = lowerBound.add(1, "month");
      upperBound = upperBound.add(1, "month");
    }

    this.tile = this.setTileLegend(store.getState().stat.fuelStat);
  }

  // ======================

  private createFuelStatRecord(
    timestamp: number, data: FuelFormFinalState[]): StatRecord {
    // пробег за месяц - разница показаний пробега между первой
    //  и последней заправками (последняя заправка - это первая из следующего месяца).
    // Суммарный объем топлива считается только на данных за этот месяц,
    // последний элемент массива отбрасывается
    const run = data[data.length - 1].fuelRun - data[0].fuelRun;
    const fuelSum = data.slice(0, -1).reduce((acc, item) => (acc += item.fuelVolume), 0);
    return {
      timestamp: timestamp,
      value: Math.round((fuelSum * 1000) / run) / 10,
    };
  }
}
