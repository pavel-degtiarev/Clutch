import { FinalBasicFormsState } from "../../HOC/with-validate-check/check-form";

export interface SlotRowData {
  title: string;
  value: string | null;
  aux?: FinalBasicFormsState;
}

export interface StatSlot {
  header: string;
  rows: SlotRowData[];
}
