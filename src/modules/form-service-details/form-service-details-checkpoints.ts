import { DetailsFormState } from "../../context/form-state/form-init-states";
import { submitCheckpoint } from "../../HOC/with-validate-submit/submit-checkpoint";

export const formServiceDetailsCheckpoints: Checkpoint<DetailsFormState>[] = [
  function noEmptyFields(state: DetailsFormState) {
    return submitCheckpoint(
      () => {
        const allTitles = [...state.services, ...state.spares].map(item => item.title);
        return !allTitles.includes("");
      },
      "Пустые поля нужно заполнить или удалить!"
    )
  },
];
