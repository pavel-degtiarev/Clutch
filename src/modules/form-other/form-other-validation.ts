import { setStateFunction } from "../../HOC/with-validate-check/with-validate-check";
import { OtherFormFields, OtherFormState } from "../../context/form-state/form-init-states";

export default function getValidateOtherForm(setState: setStateFunction<OtherFormState>) {
  return function (target: OtherFormFields, value: string) {

        const validations: FormValidations<OtherFormFields> = {
          otherDate: (value) => {
            setState((prevState) => {
              const newState = { ...prevState, otherDate: value };
              return newState;
            });
          },

          otherTitle: (value) => {
            setState((prevState) => {
              const newState = { ...prevState, otherTitle: value };
              return newState;
            });
          },

          otherPrice: (value) => {
            setState((prevState) => {
              const newState = { ...prevState, otherPrice: value };
              return newState;
            });
          },
        };

        const checkTarget = validations[target];
        checkTarget && checkTarget(value);
  }
}
