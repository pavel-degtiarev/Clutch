import React, { useRef, useState } from "react";
import { FormComponentProps, setStateFunction } from "../../HOC/with-validate-submit/with-validate-submit";

import styles from "./form-service-details.module.scss";
import containerStyles from "../../components/popup-container/popup-container.module.scss";

// ==========================================

const ServiceDetailsFormInitState = {}

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
            
						<div className="tabs details-select">
							<div className="tab-container">
								<input type="radio" name="tab-details" id="tab-services" value="services" checked />
								<label htmlFor="tab-services" className="tab">
									Работы
									<br />
									(12000 руб.)
								</label>
							</div>
							<div className="tab-container">
								<input type="radio" name="tab-details" id="tab-spares" value="spares" />
								<label htmlFor="tab-spares" className="tab">
									З/Ч, расходники
									<br />
									(2000 руб.)
								</label>
							</div>
						</div>

						<div className="details-list">
							<div className="details-row title-small details-list-header">
								<p className="details-title no-wrap">Название</p>
								<p className="details-price">Цена (руб.)</p>
							</div>

							<div className="details-list-body">
								<div className="details-row">
									<div className="details-title">
										<input
											className="field no-wrap"
											name="title"
											value="блок клапанов коробки передач"
										/>
									</div>

									<div className="details-price">
										<input className="field" inputMode="decimal" name="price" value="4500" />
									</div>
								</div>

								<div className="details-row">
									<div className="add-details-button"></div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}
