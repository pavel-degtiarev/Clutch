import React, { useEffect, useState } from "react";
import classNames from "classnames";
import {
	FormComponentProps,
	setStateFunction,
} from "../../HOC/with-validate-submit/with-validate-submit";
import TabsGroup, { TabInfo } from "../../components/tabs/tabs-group";
import Button from "../../components/button/button";
import DetailsList, { detailsListStyles } from "../../components/details-list/details-list";
import FieldText from "../../components/field/field-text";
import FieldWithSuffix from "../../components/field/field-with-suffix";
import InputNumeric from "../../components/field/input/input-numeric";

import { FieldSuffixes } from "../../general/global.var";
import styles from "./form-service-details.module.scss";
import containerStyles from "../../components/popup-container/popup-container.module.scss";
import Validated from "../../HOC/validated/validated";
import { RowDeletable } from "../../components/details-list/row-deletable";

// ==========================================

const detailsTabs: TabInfo[] = [
	{ id: "services", title: "Работы" },
	{ id: "spares", title: "З/Ч, расходники" },
];

const ServiceDetailsFormInitState = {
	services: [
		{ id:1265, title: "замена блока клапанов КПП", price: 30000 },
		{ id:6845, title: "замена прокладки крышки клапанов", price: 3000 },
	],
	spares: [
		{ id:5831, title: "блок клапанов коробки передач", price: 4500 },
		{ id:12, title: "прокладка клапанной крышки", price: 500 },
		{ id:681, title: "воздушный фильтр", price: 200 },
		{ id:3215951, title: "сальник привода", price: 500 },
		{ id:153, title: "моторное масло", price: 3500 },
		{ id:9845, title: "масляный фильтр", price: 800 },
		{ id:651716, title: "шаровая опора", price: 500 },
		{ id:44562, title: "сайлент-блоки", price: 400 },
	],
};

export type ServiceDetails = {
	id: number;
	title: string;
	price: number;
};

export type ServiceDetailsFormState = {
	services: ServiceDetails[];
	spares: ServiceDetails[];
};
export type ServiceDetailsFormFields = keyof ServiceDetailsFormState;

// ============================================

export default function FormServiceDetails({ getValidate, submit
}: FormComponentProps<ServiceDetailsFormFields, ServiceDetailsFormState>) {
	const [formState, setFormState] = useState<ServiceDetailsFormState>(ServiceDetailsFormInitState);
	const [currentTab, setCurrentTab] = useState(detailsTabs[0].id);

	const validate = getValidate(setFormState as setStateFunction<ServiceDetailsFormState>);
	const getFieldName = (suffix: string, currentTab: string): string => `${currentTab}-${suffix}`;
	const addRow = () => validate(`${currentTab}-add` as ServiceDetailsFormFields, "");
	const deleteRow = (index: number) => validate(`${currentTab}-delete-${index}` as ServiceDetailsFormFields, "");

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
						<TabsGroup
							name="service-details"
							tabs={detailsTabs}
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
					</div>
				</form>
			</div>

			<Button
				title="Сохранить"
				auxStyles={containerStyles.saveButton}
				clickHandler={() => {
					if (submit(formState)) {
						// dispatch(popupClosed());
					}
				}}
			/>
		</>
	);
}
