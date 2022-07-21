import { RepeatFormState } from "../../context/form-state/form-init-states";
import { checkpoint } from "../../HOC/with-validate-check/checkpoint";

export const formServiceRepeatCheckpoints: Checkpoint<RepeatFormState>[] = [

  function runFilled(state: RepeatFormState) {
    return checkpoint(
      () => {
        if (!state.repeatByRun) return true;
        if (state.repeatingRun) return true;
        return false;
      },
      "Не указан пробег!"
    );
  },

  function timeFilled(state: RepeatFormState) {
    return checkpoint(
      () => {
        if (!state.repeatByTime) return true;
        if (state.repeatingTime) return true;
        return false;
      },
      "Не указан период времени!"
    );
  },
];
