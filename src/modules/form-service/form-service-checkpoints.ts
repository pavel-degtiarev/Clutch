import dayjs from "dayjs";
import { loadNearestBoundingDates } from "../../API/access-db";
import { dbStoreName } from "../../API/init-db";
import { ServiceFormState } from "../../context/form-state/form-init-states";
import { FuelFormFinalState, ServiceFormFinalState } from "../../HOC/with-validate-check/check-form";
import { checkpoint } from "../../HOC/with-validate-check/checkpoint";

export const formServiceCheckpoints: Checkpoint<ServiceFormState>[] = [
  function noEmptyFields(state: ServiceFormState): boolean {
    return checkpoint(() => !Object.values(state).includes(""), "Все поля должны быть заполнены!");
  },

  async function runIsCorrect(state: ServiceFormState): Promise<boolean> {
    const serviceRun = Number(state.serviceRun);
    const serviceDate = dayjs(state.serviceDate);

    // fuelBound, serviceBound - массивы из двух значений: пробег с предшествующей и последующей дат.
    const [fuelBound, serviceBound] = await Promise.all([
      loadNearestBoundingDates(dbStoreName.FUEL, serviceDate.valueOf()),
      loadNearestBoundingDates(dbStoreName.SERVICE, serviceDate.valueOf()),
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
      () => serviceRun >= lowerBound && serviceRun <= upperBound,
      `Пробег на эту дату должен быть в пределах от ${lowerBound} до ${upperBound} км.`
    );
  },
];
