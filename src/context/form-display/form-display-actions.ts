import { FormDisplayAction, FormDisplayActionTypes, FormItem } from "./form-display-types";

export function rollupToggled(): FormDisplayAction {
  return {
    type: FormDisplayActionTypes.ROLLUP_TOGGLED,
  } as const;
}

export function formSelected(payload: FormItem): FormDisplayAction {
  return {
    type: FormDisplayActionTypes.FORM_SELECTED,
    payload: payload,
  } as const;
}

export function subformSelected(payload: FormItem): FormDisplayAction {
  return {
    type: FormDisplayActionTypes.SUBFORM_SELECTED,
    payload: payload,
  } as const;
}

export function formClosed(): FormDisplayAction {
  return {
    type: FormDisplayActionTypes.FORM_CLOSED,
  } as const;
}

export function subformClosed(): FormDisplayAction {
  return {
    type: FormDisplayActionTypes.SUBFORM_CLOSED,
  } as const;
}
