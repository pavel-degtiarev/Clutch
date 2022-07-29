import dayjs from "dayjs";
import { getOldestDate, loadAllByDateIndex } from "../../API/access-db";
import { dbStoreName } from "../../API/init-db";
import { FuelFormFinalState } from "../../HOC/with-validate-check/check-form";
import { setRunStat, StatRecord } from "../../store/stat-slice/stat-slice";
import { ClutchStoreType } from "../../store/store";
import TileController from "../tile-controller/tile-controller";

export default class RunTileController extends TileController {
  dbName: dbStoreName;

  constructor(store: ClutchStoreType) {
    super("Пробег", "км.", store);
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

    // Берем данные из того же стора, что и fuel (там есть данные о пробеге).
    while (monthStart.isSameOrBefore(now)) {
      const statRecord = await this.createStatRecord(monthStart, monthEnd);      
      if (statRecord) this.dispatch(setRunStat(statRecord));

      monthStart = monthStart.add(1, "month");
      monthEnd = monthEnd.add(1, "month");
    }

    this.tile = this.setTileLegend(this.store.getState().stat.runStat);
  }

  // ======================

  async createStatRecord(start: dayjs.Dayjs, end: dayjs.Dayjs): Promise<StatRecord | undefined>{
    const refuelsInPeriod = await loadAllByDateIndex<FuelFormFinalState>(
      this.dbName, start.valueOf(), end.valueOf());

    // если за этот месяц нет записей, пропускаем
    if (!refuelsInPeriod) return;

      return {
        timestamp: start.valueOf(),
        value: refuelsInPeriod[refuelsInPeriod.length - 1].fuelRun - refuelsInPeriod[0].fuelRun,
      };
  }
}
