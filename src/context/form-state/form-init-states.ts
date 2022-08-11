import dayjs from "dayjs";
import { timeSlotOptions } from "../../general/global.var";

export const fuelFormInitState = {
  fuelDate: dayjs().format("YYYY-MM-DD"),
  fuelRun: "",
  fuelCost: "",
  fuelPrice: "",
  fuelVolume: "",
};

export const spareFormInitState = {
  spareDate: dayjs().format("YYYY-MM-DD"),
  spareTitle: "",
  sparePrice: "",
};

export const serviceFormInitState = {
  serviceDate: dayjs().format("YYYY-MM-DD"),
  serviceDescription: "",
  serviceRun: "",
  serviceTotal: "",
  serviceRepeat: false,
  serviceTotalDetails: {} as DetailsFormState,
  serviceRepeatDetails: {} as RepeatFormState,
};

export const otherFormInitState = {
  otherDate: dayjs().format("YYYY-MM-DD"),
  otherTitle: "",
  otherPrice: "",
};

export const repeatFormInitState = {
  repeatId: 0,
  repeatingRun: "",
  repeatingTime: "",
  repeatByRun: false,
  repeatByTime: false,
  repeatTimeSlot: timeSlotOptions[1].value,
};

export const detailsFormInitState = {
  services: [],
  spares: [],
};

type WithID = { id?: number | undefined };

export type FuelFormState = typeof fuelFormInitState & WithID;
export type FuelFormFields = keyof typeof fuelFormInitState;

export type SpareFormState = typeof spareFormInitState & WithID;
export type SpareFormFields = keyof typeof spareFormInitState;

export type ServiceFormState = typeof serviceFormInitState & WithID;
export type ServiceFormFields = keyof typeof serviceFormInitState;

export type OtherFormState = typeof otherFormInitState & WithID;
export type OtherFormFields = keyof typeof otherFormInitState;

export type RepeatFormState = typeof repeatFormInitState & WithID;
export type RepeatFormFields = keyof typeof repeatFormInitState;

export type DetailsFormState = {
  services: ServiceDetails[];
  spares: ServiceDetails[];
};
export type DetailsFormFields = keyof DetailsFormState;
