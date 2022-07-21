import { setStateFunction } from "../../HOC/with-validate-check/with-validate-check";
import { ServiceFormFields, ServiceFormState } from "../../context/form-state/form-init-states";

export default function getValidateServiceForm(setState: setStateFunction<ServiceFormState>) {
  return function (target: ServiceFormFields, value: string) {

    const validations: FormValidations<ServiceFormFields> = {
      serviceDate: (value) => {
        setState((prevState) => {
          const newState = { ...prevState, serviceDate: value };
          return newState;
        });
      },

      serviceDescription: (value) => {
        setState((prevState) => {
          const newState = { ...prevState, serviceDescription: value };
          return newState;
        });
      },

      serviceRun: (value) => {
        setState((prevState) => {
          const newState = { ...prevState, serviceRun: value };
          return newState;
        });
      },

      serviceTotal: (value) => {
        setState((prevState) => {
          const newState = { ...prevState, serviceTotal: value };
          return newState;
        });
      },

      serviceRepeat: (value) => {
        setState((prevState) => {
          const newState = { ...prevState, serviceRepeat: value };

          return newState;
        });
      },

      serviceTotalDetails: (value) => {
        setState((prevState) => {
          const newState = { ...prevState, serviceTotalDetails: value };
          // WIP посчитать newState.serviceTotal
          return newState;
        });
      },

      serviceRepeatDetails: (value) => {
        setState((prevState) => {
          const newState = { ...prevState, serviceRepeatDetails: value };
          if (!value) {
            newState.serviceRepeat = false;
          }
          return newState;
        });
      },
    };

    const checkTarget = validations[target];
    checkTarget && checkTarget(value);
  };
}
