import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { StatSlot } from "../components/stat-table/slot-types";
import { TabInfo } from "../components/tabs/tabs-group";
import { TimeInterval } from "../general/global.var";
import { Statistics, StatRecord } from "../store/stat-slice/stat-slice";

function createRow(
  source: StatRecord[],
  date: number,
  title: string,
  units: string,
  slot: StatSlot
) {
  const periodData = source.find((item) => item.timestamp === date);
  slot.rows.push({
    title: title,
    value: periodData ? `${periodData.value} ${units}` : null,
  });
}

function fillStatTable(statData: Statistics, currentTab:TabInfo) {
  const slots: StatSlot[] = [];

  getAllStatDates(statData).forEach((date) => {
    const slot: StatSlot = { header: "", rows: [] };
    slot.header =
      currentTab.id === TimeInterval.YEAR
        ? dayjs(date).format("YYYY год")
        : dayjs(date).format("MMMM YYYY года");
    
    createRow(statData.runStat, date, "Пробег", "км.", slot);
    createRow(statData.fuelStat, date, "Расход топлива", "л./100 км.", slot);
    createRow(statData.expenceStat, date, "Затраты", "руб.", slot);

    slots.push(slot);
  });

  return slots;
}

function getAllStatDates(statData: Statistics) {
  const allDates = [...statData.expenceStat, ...statData.fuelStat, ...statData.runStat]
    .map((item) => item.timestamp)
    .sort((a, b) => b - a);
  return new Set(allDates);
}

function createAnnualSummary(stat: StatRecord[], average = false) {
  const summaryStat: StatRecord[] = [];
  const tempMap = new Map<number, number[]>();

  stat.forEach((item) => {
    const year = dayjs(item.timestamp).startOf("year").valueOf();
    const data = tempMap.get(year) || [];
    data.push(item.value);
    tempMap.set(year, data);
  });

  tempMap.forEach((value, key) =>
    summaryStat.push({
      timestamp: key,
      value: average
        ? Math.round((value.reduce((sum, item) => sum + item, 0) / value.length) * 10) / 10
        : value.reduce((sum, item) => sum + item, 0),
    })
  );
  return summaryStat;
}

// ====================================

export default function useStatTable(statData: Statistics, currentTab: TabInfo) {
  const [tableData, setTableData] = useState<StatSlot[]>([]);
  useEffect(() => {
    let data = statData;
    if (currentTab.id === TimeInterval.YEAR) {
      data = {
        fuelStat: createAnnualSummary(statData.fuelStat, true),
        runStat: createAnnualSummary(statData.runStat),
        expenceStat: createAnnualSummary(statData.expenceStat),
      };
    }
    setTableData(fillStatTable(data, currentTab));
  }, [statData, currentTab]);

  return tableData;
}
