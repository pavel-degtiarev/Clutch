import React, { useContext, useState } from "react";
import { FormComponentProps, setStateFunction } from "../../HOC/with-validate-check/with-validate-check";
import { FormDisplayContext } from "../../context/form-display/form-display-state";
import { FormStateContext } from "../../context/form-state/form-state";
import Checkbox from "../../components/checkbox/checkbox";
import FieldGroup from "../../components/field-group/field-group";
import Select from "../../components/select/select";
import { FieldSuffixes, timeSlotOptions} from "../../general/global.var";
import Button from "../../components/button/button";
import FieldWithSuffix from "../../components/field/field-with-suffix";
import Validated from "../../HOC/validated/validated";
import InputNumeric from "../../components/field/input/input-numeric";
import { getTimeSuffix } from "../../utilities/units";

import styles from "./form-service-repeat.module.scss";
import containerStyles from "../../components/popup-container/popup-container.module.scss";
import { RepeatFormFields, RepeatFormState } from "../../context/form-state/form-init-states";

// ===========================================

export default function FormServiceRepeat({ getValidate, finalCheck 
}: FormComponentProps<RepeatFormFields, RepeatFormState>) {
  
  const { repeatState, updateRepeatForm } = useContext(FormStateContext);
  const { closeSubform } = useContext(FormDisplayContext);
  const [formState, setFormState] = useState<RepeatFormState>(repeatState);
  const validate = getValidate(setFormState as setStateFunction<RepeatFormState>);

  return (
    <>
      <div className={containerStyles.popupContent}>
        <form className={containerStyles.form}>
          <div className={styles.serviceRepeatFields}>

            <FieldGroup>
              <Validated
                validate={validate}
                Control={<Checkbox
                  name="repeatByRun" label="по пробегу"
                  isChecked={formState.repeatByRun}/>}
              />

              <Validated
                validate={validate}
                Control={ <FieldWithSuffix InputComponent={InputNumeric}
                  name="repeatingRun" label="Пробег"
                  value={formState.repeatingRun}
                  suffix={FieldSuffixes.RUN}
                  disabled={!formState.repeatByRun}/>}
              />
            </FieldGroup>

            <FieldGroup>
              <Validated
                validate={validate}
                Control={ <Checkbox
                  name="repeatByTime" label="по времени"
                  isChecked={formState.repeatByTime}/>}
              />

              <FieldGroup horizontal>

                <Validated
                  validate={validate}
                  Control={ <FieldWithSuffix InputComponent={InputNumeric}
                    name="repeatingTime"label="Время"
                    value={formState.repeatingTime}
                    disabled={!formState.repeatByTime}
                    suffix={getTimeSuffix(
                      formState.repeatingTime,
                      formState.repeatTimeSlot)} />}
                />

                <Validated
                  validate={validate}
                  Control={ <Select
                      name="repeatTimeSlot"
                      options={timeSlotOptions}
                      selected={formState.repeatTimeSlot}
                      disabled={!formState.repeatByTime}/>}
                />
              </FieldGroup>
            </FieldGroup>
          </div>
        </form>
      </div>

      <Button
        title="Сохранить"
        auxStyles={containerStyles.saveButton}
        clickHandler={() => {
          if (finalCheck(formState)) {
            updateRepeatForm(formState);
            closeSubform();
          }
        }}
      />
    </>
  );
}
