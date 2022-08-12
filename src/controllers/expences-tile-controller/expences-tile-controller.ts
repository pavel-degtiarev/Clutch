import dayjs from "dayjs";
import { getNewestDate, getOldestDate, loadAllByDateIndex } from "../../API/access-db";
import { dbStoreName } from "../../API/init-db";
import {
  FinalBasicFormsState,
  FuelFormFinalState,
  OtherFormFinalState,
  ServiceFormFinalState,
  SpareFormFinalState,
} from "../../HOC/with-validate-check/check-form";
import {
  isFuelFormFinalState,
  isOtherFormFinalState,
  isServiceFormFinalState,
  isSpareFormFinalState,
} from "../../HOC/with-validate-check/form-typeguards";
import { clearExpenceStat, setExpenceStat, StatRecord } from "../../store/stat-slice/stat-slice";
import { ClutchStoreType } from "../../store/store";
import TileController from "../tile-controller/tile-controller";

// ======================

export default class ExpencesTileController extends TileController {
  dbNames: dbStoreName[];

  constructor(store: ClutchStoreType) {
    super("Затраты", "руб.", store);
    this.dbNames = [dbStoreName.FUEL, dbStoreName.SERVICE, dbStoreName.SPARE, dbStoreName.OTHER];
  }

  // ======================

  async initController(): Promise<void> {
    this.dispatch(clearExpenceStat());
    const now = dayjs().startOf(this.timeInterval);

    // если во всех нужных сторах нет данных, все старейшие даты будут нулями
    let oldest = await Promise.all(this.dbNames.map((store) => getOldestDate(store)));
    if (oldest.every((item) => item === 0)) return;

    // ищем старейшую ненулевую дату
    oldest = oldest.filter((item) => item !== 0);
    const initDate = dayjs(Math.min(...oldest));

    // ищем самую новую дату
    let newestDates = await Promise.all(this.dbNames.map((store) => getNewestDate(store)));
    const newest = dayjs(Math.min(...newestDates));

    let timeStart = initDate.startOf(this.timeInterval);
    let timeEnd = initDate.endOf(this.timeInterval);

    while (timeStart.isSameOrBefore(newest)) {
      const statRecord = await this.createStatRecord(timeStart, timeEnd);
      if (statRecord) this.dispatch(setExpenceStat(statRecord));

      timeStart = timeEnd.add(1, this.timeInterval).startOf(this.timeInterval);
      timeEnd = timeStart.endOf(this.timeInterval);
    }

    this.tile = this.setTileLegend(this.store.getState().stat.expenceStat);

    // если timeInterval был изменен, контроллер инициализируется заново
    // и состояние Tiles обновляется
    this.onUpdateCallback && this.onUpdateCallback();
  }

  // ======================

  async createStatRecord(start: dayjs.Dayjs, end: dayjs.Dayjs): Promise<StatRecord | undefined> {
    const expencesInPeriod = await Promise.all(
      this.dbNames.map((dbName) =>
        loadAllByDateIndex<FinalBasicFormsState>(dbName, start.valueOf(), end.valueOf())
      )
    );

    // если за этот период нет записей, возвращаем пустой объект
    if (expencesInPeriod.every((item) => item.length === 0))
      return { timestamp: start.valueOf(), value: 0 };

    // в генерацию статистики за период передаем только ненулевые массивы данных
    const nonZeroExpensesInPeriod = expencesInPeriod.filter((item) => item.length !== 0);
    let totalExpencesInPeriod = 0;

    nonZeroExpensesInPeriod.forEach((statArray) => {
      switch (true) {
        case isFuelFormFinalState(statArray[0]):
          totalExpencesInPeriod += (statArray as FuelFormFinalState[]).reduce(
            (acc, item) => (acc += item.fuelCost), 0);
          break;

        case isOtherFormFinalState(statArray[0]):
          totalExpencesInPeriod += (statArray as OtherFormFinalState[]).reduce(
            (acc, item) => (acc += item.otherPrice), 0);
          break;

        case isSpareFormFinalState(statArray[0]):
          totalExpencesInPeriod += (statArray as SpareFormFinalState[]).reduce(
            (acc, item) => (acc += item.sparePrice), 0);
          break;

        case isServiceFormFinalState(statArray[0]):
          totalExpencesInPeriod += (statArray as ServiceFormFinalState[]).reduce(
            (acc, item) => (acc += item.serviceTotal), 0);
          break;
      }
    });

    return {
      timestamp: start.valueOf(),
      value: totalExpencesInPeriod,
    };
  }

  // ======================

  async update(timestamp: number) {
    const initDate = dayjs(timestamp);
    let timeStart = initDate.startOf(this.timeInterval);
    let monthEnd = initDate.endOf(this.timeInterval);

    const statRecord = await this.createStatRecord(timeStart, monthEnd);
    if (statRecord) this.dispatch(setExpenceStat(statRecord));

    this.tile = this.setTileLegend(this.store.getState().stat.expenceStat);
    this.onUpdateCallback && this.onUpdateCallback();
  }
}
