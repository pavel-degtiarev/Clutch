import dayjs from "dayjs";
import _ from "lodash";
import { ServiceFormState } from "../../context/form-state/form-init-states";
import { RepeatFormFinalState, ServiceFormFinalState } from "../../HOC/with-validate-check/check-form";

export function convertServiceFields(state: ServiceFormState): ServiceFormFinalState {
  const finalState: ServiceFormFinalState = {
    serviceDate: dayjs(state.serviceDate).toDate().valueOf(),
    serviceDescription: state.serviceDescription,
    serviceRun: Number(state.serviceRun),
    serviceTotal: Number(state.serviceTotal),
    serviceTotalDetails: state.serviceTotalDetails,
  };
  return finalState;
}
