import { SpareFormState } from "../../context/form-state/form-init-states";
import { checkpoint } from "../../HOC/with-validate-check/checkpoint";

export const formSpareCheckpoints: Checkpoint<SpareFormState>[] = [
  function noEmptyFields(state: SpareFormState): boolean {
    return checkpoint(
      () => !Object.values(state).includes(""),
      "Все поля должны быть заполнены!"
    );
  },
];
