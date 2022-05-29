import React, { useCallback, useState } from "react";
import classNames from "classnames";
import Button from "../../components/button/button";
import Rollup, { RollupItem } from "./rollup";

import basicButtonStyles from "../../styles/components/button.module.scss";
import rollupButtonStyles from "./button-rollup.module.scss";
import { rollupToggled } from "../../components/popup-switch/popup-switch-actions";

type ButtonRollupProps = {
	title: string;
	forms: RollupItem[];
	rollupOpened: any;
	dispatch: Function;
};

export default function ButtonRollup({ title, forms, rollupOpened, dispatch }: ButtonRollupProps) {
	const auxStyles = classNames(basicButtonStyles.withMark, {
		[rollupButtonStyles.rollupActive]: rollupOpened,
	});
	
	return (
		<div className={rollupButtonStyles.buttonRollupContainer}>
			<Button title={title} auxStyles={auxStyles} clickHandler={() => dispatch(rollupToggled())} />
			<Rollup items={forms} isOpened={rollupOpened} dispatch={dispatch} />
		</div>
	);
}
