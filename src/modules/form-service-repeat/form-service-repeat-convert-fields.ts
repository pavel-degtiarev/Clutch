import { RepeatFormState } from "../../context/form-state/form-init-states";
import { RepeatFormFinalState } from "../../HOC/with-validate-check/check-form";

export function convertServiceRepeatFields(state: RepeatFormState): RepeatFormFinalState {
  const finalState: RepeatFormFinalState = {
    serviceId: 0,
    repeatByRun: state.repeatByRun,
    repeatingRun: Number(state.repeatingRun),
    repeatByTime: state.repeatByTime,
    repeatingTime: Number(state.repeatingTime),
    repeatTimeSlot: state.repeatTimeSlot,
  };

  return finalState;
}
