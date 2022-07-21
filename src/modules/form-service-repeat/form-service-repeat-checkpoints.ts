import { RepeatFormState } from "../../context/form-state/form-init-states";
import { submitCheckpoint } from "../../HOC/with-validate-submit/submit-checkpoint";

export const formServiceRepeatCheckpoints: Checkpoint<RepeatFormState>[] = [

  function runFilled(state: RepeatFormState) {
    return submitCheckpoint(
      () => {
        if (!state.repeatByRun) return true;
        if (state.repeatingRun) return true;
        return false;
      },
      "Не указан пробег!"
    );
  },

  function timeFilled(state: RepeatFormState) {
    return submitCheckpoint(
      () => {
        if (!state.repeatByTime) return true;
        if (state.repeatingTime) return true;
        return false;
      },
      "Не указан период времени!"
    );
  },
];
