import { DetailsFormState } from "../../context/form-state/form-init-states";
import { checkpoint } from "../../HOC/with-validate-check/checkpoint";

export const formServiceDetailsCheckpoints: Checkpoint<DetailsFormState>[] = [
  function noEmptyFields(state: DetailsFormState) {
    return checkpoint(
      () => {
        const allTitles = [...state.services, ...state.spares].map(item => item.title);
        return !allTitles.includes("");
      },
      "Пустые поля нужно заполнить или удалить!"
    )
  },
];
