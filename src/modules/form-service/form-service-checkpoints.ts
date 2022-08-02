import dayjs from "dayjs";
import { loadNearestBoundingDates } from "../../API/access-db";
import { dbStoreName } from "../../API/init-db";
import { ServiceFormState } from "../../context/form-state/form-init-states";
import { FuelFormFinalState } from "../../HOC/with-validate-check/check-form";
import { checkpoint } from "../../HOC/with-validate-check/checkpoint";

export const formServiceCheckpoints: Checkpoint<ServiceFormState>[] = [
  function noEmptyFields(state: ServiceFormState): boolean {
    return checkpoint(
      () => !Object.values(state).includes(""),
      "Все поля должны быть заполнены!");
  },

  async function runIsCorrect(state: ServiceFormState): Promise<boolean> {
    const serviceRun = Number(state.serviceRun);
    const serviceDate = dayjs(state.serviceDate);

    // В serviceStore хранятся данные о пробеге, но все равно смотрим по базе Fuel.
    // Там они обновляются чаще
    const bound = await loadNearestBoundingDates(dbStoreName.FUEL, serviceDate.valueOf());
    const lowerRunBound = bound[0] ? (bound[0] as FuelFormFinalState).fuelRun : -Infinity;
    const upperRunBound = bound[1] ? (bound[1] as FuelFormFinalState).fuelRun : Infinity;

    return checkpoint(
      () => serviceRun >= lowerRunBound && serviceRun <= upperRunBound,
      `Пробег на эту дату должен быть в пределах от ${lowerRunBound} до ${upperRunBound} км.`
    );
  },
];
