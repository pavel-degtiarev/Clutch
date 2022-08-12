import React, { useContext, useEffect, useState } from "react";
import { FormStateContext } from "../../context/form-state/form-state";
import useRawData from "../../hooks/use-raw-data";
import Table from "./table";
import { formEditController } from "../../index";
import { FormDisplayContext } from "../../context/form-display/form-display-state";
import { FinalBasicFormsStateWithID } from "../../HOC/with-validate-check/check-form";

export default function RawTable() {

  const { showForm } = useContext(FormDisplayContext);
  const formState = useContext(FormStateContext);
  formEditController.setShowFormAction(showForm);
  formEditController.setFormsDataActions(formState);

  const {data, updateData} = useRawData();

  return (
    <Table
      slots={data}
      rowsDeletable
      slotEditHandler={(formData: FinalBasicFormsStateWithID) => {
        formEditController.editForm(formData);
        updateData();
      }}
      slotDeleteHandler={(formData: FinalBasicFormsStateWithID) => {
        formEditController.deleteRow(formData);
        updateData();
      }}
    />
  );
}
