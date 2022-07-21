import { FuelFormState } from "../../context/form-state/form-init-states";
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
];
