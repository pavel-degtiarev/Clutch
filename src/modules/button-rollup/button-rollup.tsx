import React, { useCallback, useState } from "react";
import classNames from "classnames";
import Button from "../../components/button/button";
import Rollup, { RollupItem } from "./rollup";

import basicButtonStyles from "../../styles/components/button.module.scss";
import rollupButtonStyles from "./button-rollup.module.scss";

type ButtonRollupProps = {
	title: string;
	rollup: RollupItem[];
};

export default function ButtonRollup({ title, rollup }: ButtonRollupProps) {
	const [rollupActive, setRollupActive] = useState(false);
	const auxStyles = classNames(basicButtonStyles.withMark, {
		[rollupButtonStyles.rollupActive]: rollupActive,
	});

	const rollupTrigger = useCallback(() => setRollupActive((prevState) => !prevState), []);
	
	return (
		<div className={rollupButtonStyles.buttonRollupContainer}>
			<Button title={title} auxStyles={auxStyles} clickHandler={rollupTrigger} />
			<Rollup items={rollup} isActive={rollupActive} clickHandler={rollupTrigger} />
		</div>
	);
}
