import dayjs from "dayjs";
import { getOldestDate, loadAllByDateIndex } from "../../API/access-db";
import { dbStoreName } from "../../API/init-db";
import { FuelFormFinalState } from "../../HOC/with-validate-check/check-form";
import { clearRunStat, setRunStat, StatRecord } from "../../store/stat-slice/stat-slice";
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
    this.dispatch(clearRunStat());
    const now = dayjs().startOf(this.timeInterval);

    // если в нужном сторе нет данных, старейшая дата будет 0
    // ничего не заполняем, просто выходим
    const oldest = await getOldestDate(this.dbName);
    if (oldest === 0) return;

    const initDate = dayjs(oldest);
    let timeStart = initDate.startOf(this.timeInterval);
    let timeEnd = initDate.endOf(this.timeInterval);

    // Берем данные из того же стора, что и fuel (там есть данные о пробеге).
    while (timeStart.isSameOrBefore(now)) {
      const statRecord = await this.createStatRecord(timeStart, timeEnd);
      if (statRecord) this.dispatch(setRunStat(statRecord));

      timeStart = timeEnd.add(1, this.timeInterval).startOf(this.timeInterval);
      timeEnd = timeStart.endOf(this.timeInterval);
    }

    this.tile = this.setTileLegend(this.store.getState().stat.runStat);

    // если timeInterval был изменен, контроллер инициализируется заново
    // и состояние Tiles обновляется
    this.onUpdateCallback && this.onUpdateCallback();
  }

  // ======================

  async createStatRecord(start: dayjs.Dayjs, end: dayjs.Dayjs): Promise<StatRecord | undefined>{
    const refuelsInPeriod = await loadAllByDateIndex<FuelFormFinalState>(
      this.dbName, start.valueOf(), end.valueOf());

    // если за этот период нет записей, пропускаем
    if (!refuelsInPeriod) return;

      return {
        timestamp: start.valueOf(),
        value: refuelsInPeriod[refuelsInPeriod.length - 1].fuelRun - refuelsInPeriod[0].fuelRun,
      };
  }

  // ======================

  async update(timestamp: number) {
    const initDate = dayjs(timestamp);
    let timeStart = initDate.startOf(this.timeInterval);
    let timeEnd = initDate.endOf(this.timeInterval);

    const statRecord = await this.createStatRecord(timeStart, timeEnd);
    if (statRecord) this.dispatch(setRunStat(statRecord));

    this.tile = this.setTileLegend(this.store.getState().stat.runStat);
    this.onUpdateCallback && this.onUpdateCallback();
  }
}
