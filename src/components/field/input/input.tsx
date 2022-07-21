import React, { useCallback, useEffect, useState } from "react";
import { ControlledField, InputMode, InputType } from "../field-types";

import classNames from "classnames";
import styles from "../field.module.scss";
import textStyles from "../../../styles/typography.module.scss";

export interface InputProps extends ControlledField<string> {
  name: string;
  value: string;
  type?: InputType;
  inputMode?: InputMode;
  disabled?: boolean;
}

export default function Input({
  name, value, type=InputType.TEXT, inputMode, disabled=false,
  changeHandler, focusHandler, blurHandler }: InputProps) {

  const inputClassnames = classNames(styles.input, textStyles.titleNormal);
  const [fieldValue, setFieldValue] = useState(value);

  const changeField = useCallback(
    (value: string) => {
      const newValue = changeHandler ? changeHandler(value) : value;
      setFieldValue(newValue);
      return newValue;
    },
    [changeHandler]
  );

  useEffect(() => setFieldValue(value), [value]);
  
  return (
    <input
      className={inputClassnames}
      type={type} name={name} id={name} value={fieldValue}
      inputMode={inputMode} placeholder={" "}
      onChange={(e) => changeField(e.target.value)}
      onBlur={blurHandler}
      onFocus={focusHandler}
      disabled={disabled}
    />
  );
}


