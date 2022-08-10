import { useState } from "react";
import { StatSlot } from "../components/stat-table/slot-types";

export default function useRawData() {
  const [rawData, setRawData] = useState([] as StatSlot[]);

  return rawData;
}
