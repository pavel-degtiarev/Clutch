import { ReactNode } from "react";
import { FormTitle } from "../../general/forms";

export type FormDisplayAction = {
  type: keyof typeof FormDisplayActionTypes;
  payload?: FormItem;
};

export type FormItem = {
  title: FormTitle;
  form: ReactNode;
};

export enum FormDisplayActionTypes {
  ROLLUP_TOGGLED = "ROLLUP_TOGGLED",
  FORM_SELECTED = "FORM_SELECTED",
  SUBFORM_SELECTED = "SUBFORM_SELECTED",
  FORM_CLOSED = "FORM_CLOSED",
  SUBFORM_CLOSED = "SUBFORM_CLOSED",
}

export type PopupState = {
  rollupOpened: boolean;
  currentForm: FormItem | null | undefined;
  currentSubform: FormItem | null | undefined;
};
