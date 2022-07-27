import dayjs from "dayjs";
import { getOldestDate, loadAllByDateIndex } from "../../API/access-db";
import { dbStoreName } from "../../API/init-db";
import { FuelFormFinalState } from "../../HOC/with-validate-check/check-form";
import { runData } from "../../mocks/charts";
import { setRunStat, StatRecord } from "../../store/stat-slice/stat-slice";
import { ClutchStoreDispatch, ClutchStoreType } from "../../store/store";
import TileController from "../tile-controller/tile-controller";

export default class RunTileController extends TileController<"runStat"> {
  constructor() {
    super("Пробег", "км.");
    this.tile.chartData = runData;
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

    // Берем данные из того же стора, что и fuel (там есть данные о пробеге).
    while (lowerBound.isSameOrBefore(now)) {
      const refuelPerMonth = await loadAllByDateIndex<FuelFormFinalState>(
        dbName, lowerBound.valueOf(), upperBound.valueOf());
      
      // если за этот месяц нет записей, пропускаем
      if (refuelPerMonth) {
        const monthRunStatRecord = this.createRunStatRecord(lowerBound.valueOf(), refuelPerMonth);
        dispatch(setRunStat(monthRunStatRecord));
      }

      lowerBound = lowerBound.add(1, "month");
      upperBound = upperBound.add(1, "month");
    }

    this.tile = this.setTileLegend(store.getState().stat.runStat);
  }

  // ======================

  private createRunStatRecord(
    timestamp: number, data: FuelFormFinalState[]): StatRecord {
    // здесь пробег за месяц - просто разница в пробеге
    // меджу первой и последней записями за месяц
    return {
      timestamp: timestamp,
      value: data[data.length - 1].fuelRun - data[0].fuelRun,
    };
  }
}
