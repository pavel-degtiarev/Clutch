import React, { useRef, useState } from "react";
import classNames from "classnames";
import {
	FormComponentProps,
	setStateFunction,
} from "../../HOC/with-validate-submit/with-validate-submit";
import TabsGroup from "../../components/tabs/tabs-group";
import Button from "../../components/button/button";
import DetailsList, { detailsListStyles } from "../../components/details-list/details-list";
import FieldText from "../../components/field/field-text";
import { collectFormFields } from "../../utilities/collect-form-fields";
import FieldWithSuffix from "../../components/field/field-with-suffix";
import InputNumeric from "../../components/field/input/input-numeric";

import { FieldSuffixes } from "../../../global.var";
import styles from "./form-service-details.module.scss";
import containerStyles from "../../components/popup-container/popup-container.module.scss";

// ==========================================

const detailsTabs = [
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

export type ServiceDetailsFormState = typeof ServiceDetailsFormInitState;
export type ServiceDetailsFormFields = keyof ServiceDetailsFormState;

export default function FormServiceDetails({ getValidate, submit,
}: FormComponentProps<ServiceDetailsFormFields, ServiceDetailsFormState>) {

	const [formState, setFormState] = useState<ServiceDetailsFormState>(ServiceDetailsFormInitState);
	const formRef = useRef({} as HTMLFormElement);

	const validate = getValidate(setFormState as setStateFunction<ServiceDetailsFormState>);

	return (
		<>
			<div className={containerStyles.popupContent}>
				<form className={containerStyles.form} ref={formRef}>
					<div className={styles.serviceDetailsFields}>
						<TabsGroup
							name="service-details"
							tabs={detailsTabs}
							changedHandler={(tab) => console.log(tab)}
							themeOnLight
						/>

						<DetailsList headers={["Название", "Цена (руб.)"]}>
							{formState.services.map((item, index) => (
								<div className={detailsListStyles.row} key={index}>
									<FieldText
										name={`title-${index}`}
										value={item.title}
										label=""
										auxStyles={classNames(
											detailsListStyles.title,
											detailsListStyles.detailsRowField
										)}
									/>
									<FieldWithSuffix
										InputComponent={InputNumeric}
										suffix={FieldSuffixes.MONEY}
										name={`price-${index}`}
										value={`${item.price}`}
										label={""}
										auxStyles={classNames(
											detailsListStyles.price,
											detailsListStyles.detailsRowField
										)}
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
