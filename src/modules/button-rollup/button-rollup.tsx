import React from "react";
import classNames from "classnames";
import Button from "../../components/button/button";
import Rollup from "./rollup";
import { FormItem } from "../../components/popup-switch/popup-switch.types";
import { rollupToggled } from "../../components/popup-switch/popup-switch-actions";

import basicButtonStyles from "../../styles/components/button.module.scss";
import rollupButtonStyles from "./button-rollup.module.scss";

type ButtonRollupProps = {
	title: string;
	forms: FormItem[];
	rollupOpened: boolean;
	dispatch: Function;
};

export default function ButtonRollup({ title, forms, rollupOpened, dispatch }: ButtonRollupProps) {
	const auxStyles = classNames(basicButtonStyles.withMark, {
		[rollupButtonStyles.rollupActive]: rollupOpened,
	});
		
	return (
		<div className={rollupButtonStyles.buttonRollupContainer}>
			<Button title={title} auxStyles={auxStyles} clickHandler={() => dispatch(rollupToggled())} />
			<Rollup forms={forms} isOpened={rollupOpened} dispatch={dispatch} />
		</div>
	);
}
