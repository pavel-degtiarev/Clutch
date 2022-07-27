import dayjs from "dayjs";
import { getOldestDate, loadAllByDateIndex } from "../../API/access-db";
import { dbStoreName } from "../../API/init-db";
import { FinalBasicFormsState, FuelFormFinalState, OtherFormFinalState, ServiceFormFinalState, SpareFormFinalState } from "../../HOC/with-validate-check/check-form";
import { isFuelFormFinalState, isOtherFormFinalState, isServiceFormFinalState, isSpareFormFinalState } from "../../HOC/with-validate-check/form-typeguards";
import { expencesData } from "../../mocks/charts";
import { setExpenceStat, StatRecord } from "../../store/stat-slice/stat-slice";
import { ClutchStoreDispatch, ClutchStoreType } from "../../store/store";
import TileController from "../tile-controller/tile-controller";

export default class ExpencesTileController extends TileController<"expenceStat"> {
  constructor() {
    super("Затраты", "руб.");
    this.tile.chartData = expencesData;
  }

  async initController(store: ClutchStoreType): Promise<void> {
    const dispatch: ClutchStoreDispatch = store.dispatch;
    const dbNames = [dbStoreName.FUEL, dbStoreName.SERVICE, dbStoreName.SPARE, dbStoreName.OTHER];
    const now = dayjs().startOf("month");

    // если во всех нужных сторах нет данных, все старейшие даты будут нулями
    let oldest = await Promise.all(dbNames.map((store) => getOldestDate(store)));
    if (oldest.every((item) => item === 0)) return;

    // ищем старейшую ненулевую дату
    oldest = oldest.filter((item) => item !== 0);
    const initDate = dayjs(Math.min(...oldest));

    let lowerBound = initDate.startOf("month");
    let upperBound = initDate.endOf("month");

    while (lowerBound.isSameOrBefore(now)) {
      const expensesPerMonth = await Promise.all(
        dbNames.map((dbName) =>
          loadAllByDateIndex<FinalBasicFormsState>(
            dbName, lowerBound.valueOf(), upperBound.valueOf())
        )
      );

      // если за этот месяц нет записей, пропускаем
      if (!expensesPerMonth.every((item) => item.length === 0)) {

        // в функцию генерации статистики за месяц передаем
        // только ненулевые массивы данных
        const monthRunStatRecord = this.createExpencesStatRecord(
          lowerBound.valueOf(), expensesPerMonth.filter((item) => item.length !== 0));
        
        dispatch(setExpenceStat(monthRunStatRecord));
      }

      lowerBound = lowerBound.add(1, "month");
      upperBound = upperBound.add(1, "month");
    }

    this.tile = this.setTileLegend(store.getState().stat.expenceStat);
  }

  private createExpencesStatRecord(timestamp: number, data: FinalBasicFormsState[][]): StatRecord {
    let totalExpencesPerMonth = 0;

    data.forEach((statArray) => {      
      switch (true) {
        case isFuelFormFinalState(statArray[0]):
          totalExpencesPerMonth += (statArray as FuelFormFinalState[]).reduce(
            (acc, item) => (acc += item.fuelCost), 0);
          break;
        case isOtherFormFinalState(statArray[0]):
          totalExpencesPerMonth += (statArray as OtherFormFinalState[]).reduce(
            (acc, item) => (acc += item.otherPrice), 0);
          break;
        case isSpareFormFinalState(statArray[0]):
          totalExpencesPerMonth += (statArray as SpareFormFinalState[]).reduce(
            (acc, item) => (acc += item.sparePrice), 0);
          break;
        case isServiceFormFinalState(statArray[0]):
          totalExpencesPerMonth += (statArray as ServiceFormFinalState[]).reduce(
            (acc, item) => (acc += item.serviceTotal), 0);
          break;
      }
    });

    return {
      timestamp: timestamp,
      value: totalExpencesPerMonth,
    };
  }
}
