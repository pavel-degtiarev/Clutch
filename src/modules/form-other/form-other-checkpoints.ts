import { OtherFormState } from "../../context/form-state/form-init-states";
import { checkpoint } from "../../HOC/with-validate-check/checkpoint";

export const formOtherCheckpoints: Checkpoint<OtherFormState>[] = [
  function noEmptyFields(state: OtherFormState): boolean {
    return checkpoint(
      () => !Object.values(state).includes(""),
      "Все поля должны быть заполнены!"
    );
  },
];
