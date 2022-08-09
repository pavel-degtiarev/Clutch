export interface SlotRowData {
  title: string;
  value: string | null;
}

export interface StatSlot {
  header: string;
  rows: SlotRowData[];
}
