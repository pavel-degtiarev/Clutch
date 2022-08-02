import { TimeUnits } from "../general/global.var";
import { Reminder, Urgency } from "../modules/reminder-item/reminder.types";

const reminders: Array<Reminder> = [
  {
    title: "Свечи зажигания",
    urgency: Urgency.NORMAL,
    trigger: {
      run: 7800,
      time: { interval: 2, unit: TimeUnits.YEAR },
    },
  },
  {
    title: "Катушки зажигания",
    urgency: Urgency.OVERDUED,
    trigger: {
      time: { interval: 8, unit: TimeUnits.MONTH },
    },
  },
  {
    title: "Провода зажигания",
    urgency: Urgency.NEARDUE,
    trigger: {
      run: 1500,
    },
  },
  {
    title: "Моторное масло",
    urgency: Urgency.NORMAL,
    trigger: {
      run: 8500,
    },
  },
  {
    title: "Масляный фильтр",
    urgency: Urgency.NORMAL,
    trigger: {
      run: 8500,
    },
  },
  {
    title: "Ручейковый ремень навесного оборудования",
    urgency: Urgency.OVERDUED,
    trigger: {
      run:2000,
      time: { interval: 8, unit: TimeUnits.MONTH },
    },
  },
];

export default reminders;
