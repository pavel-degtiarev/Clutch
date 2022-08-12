import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getNewestDate, getOldestDate, loadAllByDateIndex } from "../API/access-db";
import { dbStoreName } from "../API/init-db";
import { SlotRowData, StatSlot } from "../components/stat-table/slot-types";
import {
  FinalBasicFormsState,
  FinalBasicFormsStateWithID,
  FuelFormFinalState,
  OtherFormFinalState,
  ServiceFormFinalState,
  SpareFormFinalState,
} from "../HOC/with-validate-check/check-form";
import {
  isFuelFormFinalState,
  isOtherFormFinalState,
  isServiceFormFinalState,
  isSpareFormFinalState,
} from "../HOC/with-validate-check/form-typeguards";

// названия всех хранилищ, кроме "repeat"
const stores = Object.values(dbStoreName).filter((item) => item !== "repeat");

// ===============================================

export default function useRawData() {
  const [data, setData] = useState([] as StatSlot[]);
  const [dataChanged, setDataChanged] = useState(false);

  function updateData() {
    setDataChanged(true);  
  }

  useEffect(() => {
    async function createRawData() {
      const newData: StatSlot[] = [];

      // ищем самую раннюю и самую позднюю даты по всей базе
      const { newestDate, oldestDate } = await getBoundingDates(stores);

      // перебираем день за днем начиная от самой поздней даты,
      for (let currentDate = newestDate; currentDate >= oldestDate; ) {
        // смотрим, есть ли в каком-либо хранилище запись на эту дату
        const recordsAtCurrentDate = await getRecordsAtDate(currentDate);

        // если есть, формируем слот и добаавляем его в общий список
        if (recordsAtCurrentDate.length > 0) {
          const newSlot = createSlot(currentDate, recordsAtCurrentDate);
          newData.push(newSlot);
        }

        currentDate = dayjs(currentDate).subtract(1, "day").valueOf();
      }
      setData(newData);
      dataChanged && setDataChanged(false);
    }
    createRawData();
  }, [dataChanged]);

  return {data, updateData};
}

// ===============================================

async function getRecordsAtDate(currentDate: number) {
  const requests = stores.map((store) => loadAllByDateIndex(store, currentDate, currentDate));
  return (await Promise.all(requests)).flat();
}

async function getBoundingDates(stores: dbStoreName[]) {
  const [start, end] = await Promise.all([
    Promise.all(stores.map((store) => getOldestDate(store))),
    Promise.all(stores.map((store) => getNewestDate(store))),
  ]);
  const oldestDate = Math.min(...start);
  const newestDate = Math.max(...end);
  return { newestDate, oldestDate };
}

function createSlot(currentDate: number, recordsAtCurrentDate: FinalBasicFormsState[]) {
  const slot: StatSlot = {
    header: dayjs(currentDate).format("DD MMMM YYYY года"),
    rows: [],
  };

  recordsAtCurrentDate.forEach((record) => {
    const row: SlotRowData = { title: "", value: null, aux: record as FinalBasicFormsStateWithID };
    switch (true) {
      case isFuelFormFinalState(record):
        row.title = "Топливо";
        row.value = `${(record as FuelFormFinalState).fuelCost} руб.`;
        break;
      case isServiceFormFinalState(record):
        row.title = (record as ServiceFormFinalState).serviceDescription;
        row.value = `${(record as ServiceFormFinalState).serviceTotal} руб.`;
        break;
      case isSpareFormFinalState(record):
        row.title = (record as SpareFormFinalState).spareTitle;
        row.value = `${(record as SpareFormFinalState).sparePrice} руб.`;
        break;
      case isOtherFormFinalState(record):
        row.title = (record as OtherFormFinalState).otherTitle;
        row.value = `${(record as OtherFormFinalState).otherPrice} руб.`;
        break;
    }
    slot.rows.push(row);
  });
  return slot;
}
