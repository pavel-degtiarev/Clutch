import React, { useContext } from "react";
import { FormStateContext } from "../../context/form-state/form-state";
import useRawData from "../../hooks/use-raw-data";
import Table from "./table";
import { formEditController } from "../../index";
import { FormDisplayContext } from "../../context/form-display/form-display-state";
import { FinalBasicFormsState } from "../../HOC/with-validate-check/check-form";

export default function RawTable() {
  const { showForm } = useContext(FormDisplayContext);
  const formState = useContext(FormStateContext);
  formEditController.setShowFormAction(showForm);
  formEditController.setFormsDataActions(formState);

  const data = useRawData();

  return (
    <Table
      slots={data}
      slotEditHandler={(formData: FinalBasicFormsState) => formEditController.editForm(formData)}
    />
  );
}
