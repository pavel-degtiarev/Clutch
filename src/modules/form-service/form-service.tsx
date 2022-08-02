import React, { useCallback, useContext, useState } from "react";
import FieldDate from "../../components/field/field-date";
import FieldText from "../../components/field/field-text";
import FieldWithSuffix from "../../components/field/field-with-suffix";
import InputNumeric from "../../components/field/input/input-numeric";
import Button from "../../components/button/button";
import ButtonIcon from "../../components/button-icon/button-icon";
import Checkbox from "../../components/checkbox/checkbox";
import Validated from "../../HOC/validated/validated";

import { useClutchStoreDispatch } from "../../store/store";
import { convertServiceFields } from "./form-service-convert-fields";
import { FormStateContext } from "../../context/form-state/form-state";
import { FormDisplayContext } from "../../context/form-display/form-display-state";
import { FormComponentProps, setStateFunction } from "../../HOC/with-validate-check/with-validate-check";
import { detailsFormInitState, repeatFormInitState, ServiceFormFields, serviceFormInitState, ServiceFormState } from "../../context/form-state/form-init-states";
import { FormItem } from "../../context/form-display/form-display-types";
import { subforms } from "../../general/forms";
import { FieldSuffixes } from "../../general/global.var";

import styles from "./form-service.module.scss";
import containerStyles from "../../components/popup-container/popup-container.module.scss";
import { saveService, ServiceSliceData } from "../../store/service-slice/service-slice";
import { convertServiceRepeatFields } from "../form-service-repeat/form-service-repeat-convert-fields";
import { saveRepeat } from "../../store/service-repeat-slice/service-repeat-slice";

// ==============================================

export default function FormService({ getValidate, finalCheck 
}: FormComponentProps<ServiceFormFields, ServiceFormState>) {
  
  const { serviceState, updateServiceForm, repeatState, detailsState, updateRepeatForm, updateDetailsForm } = useContext(FormStateContext);
  const {showSubform, closeForm} = useContext(FormDisplayContext);
  const [formState, setFormState] = useState<ServiceFormState>(serviceState);
  const storeDispatch = useClutchStoreDispatch();

  const validate = getValidate(setFormState as setStateFunction<ServiceFormState>);

  const useShowSubform = useCallback(
    (subform: FormItem, value = true) => {
      value && showSubform(subform);
      return value;
    }, [showSubform]
  );

  return (
    <>
      <div className={containerStyles.popupContent}>
        <form className={containerStyles.form}>
          <div className={styles.serviceFields}>
            <Validated<ServiceFormFields>
              validate={validate}
              Control={
                <FieldDate
                  name="serviceDate"
                  label="Дата"
                  value={formState.serviceDate}
                />}
            />

            <Validated<ServiceFormFields>
              validate={validate}
              Control={
                <FieldText
                  name="serviceDescription"
                  label="Описание"
                  value={formState.serviceDescription}
                />
              }
            />

            <Validated<ServiceFormFields>
              validate={validate}
              Control={
                <FieldWithSuffix
                  InputComponent={InputNumeric}
                  name="serviceRun"
                  label="Пробег"
                  value={formState.serviceRun}
                  suffix={FieldSuffixes.RUN}
                />
              }
            />

            <Validated<ServiceFormFields>
              validate={validate}
              Control={
                <FieldWithSuffix
                  InputComponent={InputNumeric}
                  name="serviceTotal"
                  label="Общая сумма"
                  value={formState.serviceTotal}
                  suffix={FieldSuffixes.MONEY}
                  auxStyles={styles.total}>
                  <ButtonIcon
                    auxClassNames={styles.totalDetails}
                    handler={() => useShowSubform(subforms.detailsSubform)}
                  />
                </FieldWithSuffix>
              }
            />

            <Validated<ServiceFormFields>
              validate={validate}
              Control={
                <Checkbox
                  name="serviceRepeat"
                  label="Повторять периодически"
                  isChecked={formState.serviceRepeat}
                  auxStyles={styles.repeat}
                  changeHandler={(isChecked) => useShowSubform(subforms.repeatSubform, isChecked)}>
                  <ButtonIcon
                    auxClassNames={styles.repeatDetails}
                    handler={() => useShowSubform(subforms.repeatSubform)}
                    disabled={!formState.serviceRepeat}
                  />
                </Checkbox>
              }
            />
          </div>
        </form>
      </div>

      <Button
        title="Сохранить"
        auxStyles={containerStyles.saveButton}
        clickHandler={async () => {
          const newFormState = formState;
          if (detailsState.services.length || detailsState.services.length) {
            newFormState.serviceTotalDetails = detailsState;
          }

          if (await finalCheck(newFormState)) {
            const resultService = await storeDispatch(saveService(convertServiceFields(newFormState)));
            if (resultService.meta.requestStatus === "fulfilled") {
              if (repeatState.repeatByRun || repeatState.repeatByTime) {
                const serviceId = (resultService.payload as ServiceSliceData).id;
                const finalRepeatState = convertServiceRepeatFields(repeatState);
                finalRepeatState.serviceId = serviceId;
                await storeDispatch(saveRepeat(finalRepeatState));
              }
              updateRepeatForm(repeatFormInitState);
              updateDetailsForm(detailsFormInitState);
              updateServiceForm(serviceFormInitState);
              closeForm();
            }
          }
        }}
      />
    </>
  );
}
