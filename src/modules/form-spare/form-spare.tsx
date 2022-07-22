import React, { useContext, useState } from "react";
import Button from "../../components/button/button";
import FieldDate from "../../components/field/field-date";
import FieldText from "../../components/field/field-text";
import FieldWithSuffix from "../../components/field/field-with-suffix";
import InputNumeric from "../../components/field/input/input-numeric";

import { useClutchStoreDispatch } from "../../store/store";
import { FormDisplayContext } from "../../context/form-display/form-display-state";
import { FieldSuffixes } from "../../general/global.var";
import { FormComponentProps, setStateFunction,
  } from "../../HOC/with-validate-check/with-validate-check";
import { FormStateContext } from "../../context/form-state/form-state";

import Validated from "../../HOC/validated/validated";
import { SpareFormFields, spareFormInitState, SpareFormState } from "../../context/form-state/form-init-states";
import { convertSpareFields } from "./form-spare-convert-fields";
import { saveSpare } from "../../store/spare-slice/spare-slice";

import styles from "./form-spare.module.scss";
import containerStyles from "../../components/popup-container/popup-container.module.scss";

// ==========================================

export default function FormSpare({ getValidate, finalCheck 
}: FormComponentProps<SpareFormFields, SpareFormState>) {

  const { spareState, updateSpareForm } = useContext(FormStateContext);
  const [formState, setFormState] = useState<SpareFormState>(spareState);
  const { closeForm } = useContext(FormDisplayContext);
  const storeDispatch = useClutchStoreDispatch();

  const validate = getValidate(setFormState as setStateFunction<SpareFormState>);

  return (
    <>
      <div className={containerStyles.popupContent}>
        <form className={containerStyles.form}>
          <div className={styles.spareFields}>
            <Validated<SpareFormFields>
              validate={validate}
              Control={<FieldDate name="spareDate" label="Дата" value={formState.spareDate} />}
            />

            <Validated<SpareFormFields>
              validate={validate}
              Control={
                <FieldText name="spareTitle" label="Наименование" value={formState.spareTitle} />
              }
            />

            <Validated<SpareFormFields>
              validate={validate}
              Control={
                <FieldWithSuffix
                  InputComponent={InputNumeric}
                  name="sparePrice"
                  label="Цена"
                  value={formState.sparePrice}
                  suffix={FieldSuffixes.MONEY}
                />
              }
            />
          </div>
        </form>
      </div>

      <Button
        title="Сохранить"
        auxStyles={containerStyles.saveButton}
        clickHandler={async () => {
          if (finalCheck(formState)) {
            const result = await storeDispatch(saveSpare(convertSpareFields(formState)));
            if (result.meta.requestStatus === "fulfilled") {
              updateSpareForm(spareFormInitState);
              closeForm();
            }
          }
        }}
      />
    </>
  );
}
