import { submitCheckpoint } from "../../utilities/submit-checkpoint";
import { ServiceDetailsFormState } from "./form-service-details";

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
