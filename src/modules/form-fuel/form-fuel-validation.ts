import { setStateFunction } from "../../HOC/with-validate-submit/with-validate-submit";
import { FuelFormFields, FuelFormState } from "../../context/form-state/form-init-states";

export default function getValidateFuelForm(setState: setStateFunction<FuelFormState>) {
  return function (target: FuelFormFields, value: string) {

    const validations: FormValidations<FuelFormFields> = {

      fuelDate: (value) => {
        setState((prevState) => {
          const newState = { ...prevState, fuelDate: value };
          return newState;
        });
      },

      fuelRun: (value) => {
        setState((prevState) => {
          const newState = { ...prevState, fuelRun: value };
          return newState;
        });
      },

      fuelCost: (value) => {
        setState((prevState) => {
          const newState = { ...prevState, fuelCost: value }; // calc volume with fixed price
          if (+newState.fuelPrice > 0) {
            newState.fuelVolume = `${
              Math.round((+newState.fuelCost / +newState.fuelPrice) * 10) / 10
            }`;
          }
          if (+newState.fuelCost == 0) {
            newState.fuelVolume = "";
          }
          return newState;
        });
      },

      fuelPrice: (value) => {
        setState((prevState) => {
          const newState = { ...prevState, fuelPrice: value }; // calc volume with fixed cost
          if (+newState.fuelCost > 0) {
            newState.fuelVolume = `${
              Math.round((+newState.fuelCost / +newState.fuelPrice) * 10) / 10
            }`;
          }
          if (+newState.fuelPrice == 0) {
            newState.fuelVolume = "";
          }
          return newState;
        });
      },

      fuelVolume: (value) => {
        setState((prevState) => {
          const newState = { ...prevState, fuelVolume: value }; // calc cost with fixed price
          if (+newState.fuelPrice > 0) {
            newState.fuelCost = `${Math.round(+newState.fuelVolume * +newState.fuelPrice)}`;
          }
          if (+newState.fuelVolume == 0) {
            newState.fuelCost = "";
          }
          return newState;
        });
      },
    };

    const checkTarget = validations[target];
    checkTarget && checkTarget(value);
  };
}
