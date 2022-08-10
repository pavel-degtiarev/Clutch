import React from "react";
import useRawData from "../../hooks/use-raw-data";
import Table from "./table";

export default function RawTable() {
  const data = useRawData();

  return <Table slots={data} />;
}
