import dayjs from "dayjs";
import { ServiceFormState } from "../../context/form-state/form-init-states";
import { ServiceFormFinalState } from "../../HOC/with-validate-check/check-form";

export function convertServiceFields(state: ServiceFormState): ServiceFormFinalState {
  const finalState: ServiceFormFinalState = {
    serviceDate: dayjs(state.serviceDate).toDate().valueOf(),
    serviceDescription: state.serviceDescription,
    serviceRun: Number(state.serviceRun),
    serviceTotal: Number(state.serviceTotal),
    serviceTotalDetails: state.serviceTotalDetails,
    serviceRepeat: state.serviceRepeat,
    serviceRepeatDetails: {
      ...state.serviceRepeatDetails,
      repeatingRun: Number(state.serviceRepeatDetails.repeatingRun),
      repeatingTime: Number(state.serviceRepeatDetails.repeatingTime),
    },
  };
  return finalState;
}
