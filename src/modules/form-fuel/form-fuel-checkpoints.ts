import dayjs from "dayjs";
import { loadNearestBoundingDateIndex } from "../../API/access-db";
import { dbStoreName } from "../../API/init-db";
import { FuelFormState } from "../../context/form-state/form-init-states";
import { FuelFormFinalState } from "../../HOC/with-validate-check/check-form";
import { checkpoint } from "../../HOC/with-validate-check/checkpoint";

export const formFuelCheckpoints: Checkpoint<FuelFormState>[] = [
  function noEmptyFields(state: FuelFormState): boolean {
    return checkpoint(
      () => !Object.values(state).includes(""),
      "Все поля должны быть заполнены!"
    );
  },

  function noZeroRun(state: FuelFormState): boolean {
    return checkpoint(
      () => Number(state.fuelRun) !== 0,
      "Пробег не может быть нулевым!"
    );
  },

  function noZeroVolume(state: FuelFormState): boolean {
    return checkpoint(
      () => Number(state.fuelVolume) !== 0,
      "Объем не может быть нулевым!"
    );
  },

  async function runIsCorrect(state: FuelFormState): Promise<boolean> {
    const fuelRun = Number(state.fuelRun);
    const fuelDate = dayjs(state.fuelDate);

    // bound - массив из двух значений: пробег с предшествующей и последующей дат.
    // если какого-то значения нет (например, последняя запись и следующей нет), то Infinity.
    const bound = await loadNearestBoundingDateIndex(dbStoreName.FUEL, fuelDate.valueOf());
    const lowerRunBound = bound[0] ? (bound[0] as FuelFormFinalState).fuelRun : -Infinity;
    const upperRunBound = bound[1] ? (bound[1] as FuelFormFinalState).fuelRun : Infinity;

    return checkpoint(
      () => fuelRun > lowerRunBound && fuelRun < upperRunBound,
      `Пробег на эту дату должен быть в пределах от ${lowerRunBound} до ${upperRunBound} км.`
    );
  }
];
