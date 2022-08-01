import dayjs from "dayjs";
import _ from "lodash";
import { ServiceFormState } from "../../context/form-state/form-init-states";
import { repeatFormFinalState, ServiceFormFinalState } from "../../HOC/with-validate-check/check-form";

export function convertServiceFields(state: ServiceFormState): ServiceFormFinalState {
  const finalState: ServiceFormFinalState = {
    serviceDate: dayjs(state.serviceDate).toDate().valueOf(),
    serviceDescription: state.serviceDescription,
    serviceRun: Number(state.serviceRun),
    serviceTotal: Number(state.serviceTotal),
    serviceTotalDetails: state.serviceTotalDetails,
    serviceRepeat: Number(state.serviceRepeat),
    serviceRepeatDetails: _.isEqual(state.serviceRepeatDetails, {})
      ? ({} as repeatFormFinalState)
      : {
          ...state.serviceRepeatDetails,
          repeatingRun: Number(state.serviceRepeatDetails.repeatingRun),
          repeatingTime: Number(state.serviceRepeatDetails.repeatingTime),
        },
  };
  return finalState;
}
