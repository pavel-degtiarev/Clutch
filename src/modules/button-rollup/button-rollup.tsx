import React, { useState } from "react";
import classNames from "classnames";
import Button from "../../components/button/button";
import Rollup from "./rollup";

import basicButtonStyles from "../../styles/components/button.module.scss";
import rollupButtonStyles from "./button-rollup.module.scss";

export default function ButtonRollup() {
	const [rollupActive, setRollupActive] = useState(false);
	const auxStyles = classNames(basicButtonStyles.withMark, {
		[rollupButtonStyles.rollupActive]: rollupActive,
	});
	return (
		<Button
			title="Потратить деньги"
			auxStyles={auxStyles}
			clickHandler={() => setRollupActive((prevState) => !prevState)}>
			<Rollup active={rollupActive} />
		</Button>
	);
}
