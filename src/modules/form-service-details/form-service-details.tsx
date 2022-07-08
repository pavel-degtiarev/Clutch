import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import {
	FormComponentProps,
	setStateFunction,
} from "../../HOC/with-validate-submit/with-validate-submit";
import TabsGroup, { TabInfo } from "../../components/tabs/tabs-group";
import Button from "../../components/button/button";
import DetailsList, { detailsListStyles } from "../../components/details-list/details-list";
import FieldText from "../../components/field/field-text";
import { collectFormFields } from "../../utilities/collect-form-fields";
import FieldWithSuffix from "../../components/field/field-with-suffix";
import InputNumeric from "../../components/field/input/input-numeric";

import { FieldSuffixes } from "../../../global.var";
import styles from "./form-service-details.module.scss";
import containerStyles from "../../components/popup-container/popup-container.module.scss";
import Validated from "../../HOC/validated/validated";

// ==========================================

const detailsTabs: TabInfo[] = [
	{ id: "services", title: "Работы" },
	{ id: "spares", title: "З/Ч, расходники" },
];

const ServiceDetailsFormInitState = {
	services: [
		{ title: "замена блока клапанов КПП", price: 30000 },
		{ title: "замена прокладки крышки клапанов", price: 3000 },
	],
	spares: [
		{ title: "блок клапанов коробки передач", price: 4500 },
		{ title: "прокладка клапанной крышки", price: 500 },
		{ title: "воздушный фильтр", price: 200 },
	],
};

export type ServiceDetails = {
	title: string;
	price: number;
};

export type ServiceDetailsFormState = {
	services: ServiceDetails[];
	spares: ServiceDetails[];
};
export type ServiceDetailsFormFields = keyof ServiceDetailsFormState;

// ============================================

	function useCurrentList( currentTab: string, formState: ServiceDetailsFormState
	): ServiceDetails[] {
		const [list, setList] = useState(formState.services);

		useEffect(() => {
			setList(currentTab === detailsTabs[0].id ? formState.services : formState.spares);
		}, [currentTab]);

		return list;
	}

export default function FormServiceDetails({ getValidate, submit
}: FormComponentProps<ServiceDetailsFormFields, ServiceDetailsFormState>) {

	const [formState, setFormState] = useState<ServiceDetailsFormState>(ServiceDetailsFormInitState);
	const formRef = useRef({} as HTMLFormElement);
	const [currentTab, setCurrentTab] = useState(detailsTabs[0].id);

	const validate = getValidate(setFormState as setStateFunction<ServiceDetailsFormState>);
	const getFieldName = (suffix: string, currentTab: string): string => `${currentTab}-${suffix}`;
	
	return (
		<>
			<div className={containerStyles.popupContent}>
				<form className={containerStyles.form} ref={formRef}>
					<div className={styles.serviceDetailsFields}>
						<TabsGroup
							name="service-details"
							tabs={detailsTabs}
							changedHandler={ setCurrentTab }
							themeOnLight
						/>

						<DetailsList headers={["Название", "Цена"]}>
							{useCurrentList(currentTab, formState).map((item, index) => (
								<div className={detailsListStyles.row} key={index}>

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

								</div>
							))}
						</DetailsList>
					</div>
				</form>
			</div>

			<Button
				title="Сохранить"
				auxStyles={containerStyles.saveButton}
				clickHandler={() => {
					if (submit(collectFormFields<ServiceDetailsFormFields>(formRef.current))) {
						// dispatch(popupClosed());
					}
				}}
			/>
		</>
	);
}
