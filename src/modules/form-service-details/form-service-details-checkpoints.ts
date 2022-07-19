import { ServiceDetailsFormState } from "../../context/form-state/form-init-states";
import { submitCheckpoint } from "../../utilities/submit-checkpoint";

export const formServiceDetailsCheckpoints: Checkpoint<ServiceDetailsFormState>[] = [
  function noEmptyFields(state: ServiceDetailsFormState) {
    return submitCheckpoint(
      () => {
        const allTitles = [...state.services, ...state.spares].map(item => item.title);
        return !allTitles.includes("");
      },
      "Пустые поля нужно заполнить или удалить!"
    )
  },
];
