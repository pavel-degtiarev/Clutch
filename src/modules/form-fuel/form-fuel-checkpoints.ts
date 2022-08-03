import dayjs from "dayjs";
import { loadNearestBoundingDates } from "../../API/access-db";
import { dbStoreName } from "../../API/init-db";
import { FuelFormState } from "../../context/form-state/form-init-states";
import { FuelFormFinalState, ServiceFormFinalState } from "../../HOC/with-validate-check/check-form";
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

    // fuelBound, serviceBound - массивы из двух значений: пробег с предшествующей и последующей дат.
    const [fuelBound, serviceBound] = await Promise.all([
      loadNearestBoundingDates(dbStoreName.FUEL, fuelDate.valueOf()),
      loadNearestBoundingDates(dbStoreName.SERVICE, fuelDate.valueOf()),
    ]);
    
    // если какого-то значения нет (например, последняя запись и следующей нет), то Infinity.
    const lowerBound = Math.max(
      fuelBound[0] ? (fuelBound[0] as FuelFormFinalState).fuelRun : -Infinity,
      serviceBound[0] ? (serviceBound[0] as ServiceFormFinalState).serviceRun : -Infinity
    );

    const upperBound = Math.min(
      fuelBound[1] ? (fuelBound[1] as FuelFormFinalState).fuelRun : Infinity,
      serviceBound[1] ? (serviceBound[1] as ServiceFormFinalState).serviceRun : Infinity
    );

    return checkpoint(
      () => fuelRun > lowerBound && fuelRun < upperBound,
      `Пробег на эту дату должен быть в пределах от ${lowerBound} до ${upperBound} км.`
    );
  }
];
