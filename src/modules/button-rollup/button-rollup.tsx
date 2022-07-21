import React, { useContext } from "react";
import classNames from "classnames";
import Button from "../../components/button/button";
import Rollup from "./rollup";
import { FormDisplayContext } from "../../context/form-display/form-display-state";
import { FormItem } from "../../context/form-display/form-display-types";

import basicButtonStyles from "../../styles/components/button.module.scss";
import rollupButtonStyles from "./button-rollup.module.scss";

type ButtonRollupProps = {
  title: string;
  forms: FormItem[];
  rollupOpened: boolean;
};

export default function ButtonRollup({ title, forms, rollupOpened }: ButtonRollupProps) {
  const {toggleRollup} = useContext(FormDisplayContext);
  const auxStyles = classNames(basicButtonStyles.withMark, {
    [rollupButtonStyles.rollupActive]: rollupOpened,
  });
    
  return (
    <div className={rollupButtonStyles.buttonRollupContainer}>
      <Button title={title} auxStyles={auxStyles} clickHandler={toggleRollup} />
      <Rollup forms={forms} isOpened={rollupOpened} />
    </div>
  );
}
