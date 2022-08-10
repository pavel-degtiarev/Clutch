import React, { useContext } from "react";
import { FormDisplayContext } from "../../context/form-display/form-display-state";
import PopupContainer from "../popup-container/popup-container";

export default function Popups() {
  const { state, closeForm, closeSubform } = useContext(FormDisplayContext);
  const subformOpened = !!state.currentSubform;
  return (
    <>
      <PopupContainer
        title={state.currentForm?.title}
        form={state.currentForm?.form}
        inactive={subformOpened}
        closeAction={closeForm} />

      <PopupContainer
        title={state.currentSubform?.title}
        form={state.currentSubform?.form}
        closeAction={closeSubform}
        small />
    </>
  );
}
