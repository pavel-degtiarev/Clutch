import React, { useContext } from "react";
import { FormDisplayContext } from "../../context/form-display/form-display-state";
import { FormItem } from "../../context/form-display/form-display-types";
import ButtonRollup from "../../modules/button-rollup/button-rollup";
import Popups from "../popups/popups";

type PopupSwitchProps = {
  forms: FormItem[];
};

export default function PopupSwitch({ forms }: PopupSwitchProps) {
  const { state } = useContext(FormDisplayContext);

  return (
    <>
      <ButtonRollup title="Потратить деньги" forms={forms}
        rollupOpened={state.rollupOpened} />

      <Popups/>
    </>
  );
}
