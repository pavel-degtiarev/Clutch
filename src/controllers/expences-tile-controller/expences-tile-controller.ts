import dayjs from "dayjs";
import { getOldestDate, loadAllByDateIndex } from "../../API/access-db";
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
import { setExpenceStat, StatRecord } from "../../store/stat-slice/stat-slice";
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
    const now = dayjs().startOf("month");

    // если во всех нужных сторах нет данных, все старейшие даты будут нулями
    let oldest = await Promise.all(this.dbNames.map((store) => getOldestDate(store)));
    if (oldest.every((item) => item === 0)) return;

    // ищем старейшую ненулевую дату
    oldest = oldest.filter((item) => item !== 0);
    const initDate = dayjs(Math.min(...oldest));

    let monthStart = initDate.startOf("month");
    let monthEnd = initDate.endOf("month");

    while (monthStart.isSameOrBefore(now)) {
      const statRecord = await this.createStatRecord(monthStart, monthEnd);
      if (statRecord) this.dispatch(setExpenceStat(statRecord));

      monthStart = monthStart.add(1, "month");
      monthEnd = monthEnd.add(1, "month");
    }

    this.tile = this.setTileLegend(this.store.getState().stat.expenceStat);
  }

  // ======================

  async createStatRecord(start: dayjs.Dayjs, end: dayjs.Dayjs): Promise<StatRecord | undefined> {
    const expencesInPeriod = await Promise.all(
      this.dbNames.map((dbName) =>
        loadAllByDateIndex<FinalBasicFormsState>(dbName, start.valueOf(), end.valueOf())
      )
    );

    // если за этот период нет записей, пропускаем
    if (expencesInPeriod.every((item) => item.length === 0)) return;

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
    let monthStart = initDate.startOf("month");
    let monthEnd = initDate.endOf("month");

    const statRecord = await this.createStatRecord(monthStart, monthEnd);
    if (statRecord) this.dispatch(setExpenceStat(statRecord));

    this.tile = this.setTileLegend(this.store.getState().stat.expenceStat);
    this.onUpdateCallback && this.onUpdateCallback();
  }
}
