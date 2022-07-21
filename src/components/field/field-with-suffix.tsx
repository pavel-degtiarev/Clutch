import React, { useEffect, useState } from "react";
import FieldContainer from "./container/field-container";
import { FieldSuffixes, TimeSuffixes } from "../../general/global.var";
import Label from "./label/label";
import { addSuffix } from "../../utilities/units";
import { FieldProps } from "./field-types";
import { InputNumericProps } from "./input/input-numeric";
import { InputDecimalProps } from "./input/input-decimal";


interface FieldWithSuffix extends FieldProps {
  InputComponent: (props: InputNumericProps | InputDecimalProps) => JSX.Element;
  suffix: FieldSuffixes | TimeSuffixes;
}

export default function FieldWithSuffix({
  InputComponent, name, label, value, suffix, disabled,
  changeHandler, auxStyles, children }: FieldWithSuffix) {
  
  const [isEditing, setEditing] = useState(false);
  const [currValue, setCurrValue] = useState(value);

  useEffect(()=>setCurrValue(value), [value]);

  return (
    <FieldContainer auxStyles={auxStyles}>
      {isEditing ? (
        <InputComponent
          name={name} value={currValue} disabled={disabled}
          blurHandler={(e) => {
            setCurrValue(e.target.value);
            setEditing(!isEditing);
          }}
          changeHandler={changeHandler}
        />
      ) : (
        <InputComponent
          name={name} value={addSuffix(currValue, suffix)} disabled={disabled}
          focusHandler={() => setEditing(!isEditing)}
          changeHandler={changeHandler}

        />
      )}

      <Label inputName={name} label={label} />

      {children}
      
    </FieldContainer>
  );
}
