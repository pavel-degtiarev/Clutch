import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import { FormDisplayContext } from "../../context/form-display/form-display-state";
import { FormStateContext } from "../../context/form-state/form-state";
import { FormComponentProps, setStateFunction }
  from "../../HOC/with-validate-check/with-validate-check";
import TabsGroup, { TabInfo } from "../../components/tabs/tabs-group";
import Button from "../../components/button/button";
import DetailsList, { detailsListStyles } from "../../components/details-list/details-list";
import FieldText from "../../components/field/field-text";
import FieldWithSuffix from "../../components/field/field-with-suffix";
import InputNumeric from "../../components/field/input/input-numeric";

import { FieldSuffixes } from "../../general/global.var";
import containerStyles from "../../components/popup-container/popup-container.module.scss";
import Validated from "../../HOC/validated/validated";
import { RowDeletable } from "../../components/details-list/row-deletable";
import { DetailsFormFields, DetailsFormState } from "../../context/form-state/form-init-states";
import TabsGroupContext from "../../components/tabs/tabs-group-context";

import styles from "./form-service-details.module.scss";

// ==========================================

const detailsTabs: TabInfo[] = [
  { id: "services", title: "Работы" },
  { id: "spares", title: "З/Ч, расходники" },
];

export default function FormServiceDetails({ getValidate, finalCheck 
}: FormComponentProps<DetailsFormFields, DetailsFormState>) {

  const { detailsState, updateDetailsForm } = useContext(FormStateContext);
  const { closeSubform } = useContext(FormDisplayContext);
  const [formState, setFormState] = useState<DetailsFormState>(detailsState);
  const [currentTab, setCurrentTab] = useState(detailsTabs[0].id);

  const validate = getValidate(setFormState as setStateFunction<DetailsFormState>);

  const getFieldName = (suffix: string, currentTab: string): string => `${currentTab}-${suffix}`;
  const addRow = () => validate(`${currentTab}-add` as DetailsFormFields, "");
  const deleteRow = (index: number) =>
    validate(`${currentTab}-delete-${index}` as DetailsFormFields, "");

  function useCurrentList(): ServiceDetails[] {
    const [list, setList] = useState(formState.services);
    useEffect(() => {
      setList(currentTab === detailsTabs[0].id ? formState.services : formState.spares);
    }, [currentTab]);
    return list;
  }

  return (
    <>
      <div className={containerStyles.popupContent}>
        <form className={containerStyles.form}>
          <div className={styles.serviceDetailsFields}>
            <TabsGroupContext tabInfo={detailsTabs}>
              <TabsGroup
                name="service-details"
                changedHandler={setCurrentTab}
                themeOnLight
              />

              <DetailsList headers={["Название", "Цена"]} addRowHandler={() => addRow()}>
                {useCurrentList().map((item, index) => (
                  <RowDeletable key={item.id} deleteHandler={() => deleteRow(index)}>
                    <Validated
                      validate={validate}
                      Control={
                        <FieldText
                          name={`${getFieldName("title", currentTab)}-${index}`}
                          value={item.title}
                          label=""
                          auxStyles={classNames(
                            detailsListStyles.title,
                            detailsListStyles.detailsRowField
                          )}
                        />
                      }
                    />

                    <Validated
                      validate={validate}
                      Control={
                        <FieldWithSuffix
                          InputComponent={InputNumeric}
                          suffix={FieldSuffixes.MONEY}
                          name={`${getFieldName("price", currentTab)}-${index}`}
                          value={`${item.price}`}
                          label={""}
                          auxStyles={classNames(
                            detailsListStyles.price,
                            detailsListStyles.detailsRowField
                          )}
                        />
                      }
                    />
                  </RowDeletable>
                ))}
              </DetailsList>
            </TabsGroupContext>
          </div>
        </form>
      </div>

      <Button
        title="Сохранить"
        auxStyles={containerStyles.saveButton}
        clickHandler={async () => {
          if (await finalCheck(formState)) {
            updateDetailsForm(formState);
            closeSubform();
          }
        }}
      />
    </>
  );
}
