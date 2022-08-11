export interface SlotRowData {
  title: string;
  value: string | null;
  aux?: any;
}

export interface StatSlot {
  header: string;
  rows: SlotRowData[];
}
