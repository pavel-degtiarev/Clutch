import { StatSlot } from "../components/stat-table/slot-types";

export const statTableData: StatSlot[] = [
  {
    header: "Апрель 2022 года",
    rows: [
      { title: "Пробег", value: "1500 км." },
      { title: "Расход топлива", value: "7,5 л./100 км." },
      { title: "Затраты на топливо", value: "2500 руб." },
      { title: "Сервис и расходники", value: "5500 руб." },
      { title: "Прочие затраты", value: null },
    ],
  },
  {
    header: "Март 2022 года",
    rows: [
      { title: "Пробег", value: "2500 км." },
      { title: "Расход топлива", value: "7,1 л./100 км." },
      { title: "Затраты на топливо", value: "5200 руб." },
      { title: "Сервис и расходники", value: null },
      { title: "Прочие затраты", value: null },
    ],
  },
  {
    header: "Февраль 2022 года",
    rows: [
      { title: "Пробег", value: "2000 км." },
      { title: "Расход топлива", value: "7,8 л./100 км." },
      { title: "Затраты на топливо", value: "4100 руб." },
      { title: "Сервис и расходники", value: null },
      { title: "Прочие затраты", value: null },
    ],
  },
];
