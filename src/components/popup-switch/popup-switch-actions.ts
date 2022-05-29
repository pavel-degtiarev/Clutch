
export function formSelected(payload: any) {
  return {
    type: "FORM_SELECTED",
    payload: payload,
  };
}

export function rollupToggled() {
  return {
    type: "ROLLUP_TOGGLED",
  };
}

export function popupClosed() {
  return {
    type: "POPUP_CLOSED",
  };
}
