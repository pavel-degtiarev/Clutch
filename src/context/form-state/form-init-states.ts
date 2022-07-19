import dayjs from "dayjs";
import { timeSlotOptions } from "../../general/global.var";

export const fuelFormInitState = {
	fuelDate: dayjs().format("YYYY-MM-DD"),
	fuelRun: "220120",
	fuelCost: "45",
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
	repeatingRun: "",
	repeatingTime: "",
	repeatByRun: false,
	repeatByTime: false,
	repeatTimeSlot: timeSlotOptions[1].value,
};

export const detailsFormInitState = {
	services: [
		{ id: 1265, title: "замена блока клапанов КПП", price: 30000 },
		{ id: 6845, title: "замена прокладки крышки клапанов", price: 3000 },
	],
	spares: [
		{ id: 5831, title: "блок клапанов коробки передач", price: 4500 },
		{ id: 12, title: "прокладка клапанной крышки", price: 500 },
	],
};

export type FuelFormState = typeof fuelFormInitState;
export type FuelFormFields = keyof FuelFormState;

export type SpareFormState = typeof spareFormInitState;
export type SpareFormFields = keyof SpareFormState;

export type ServiceFormState = typeof serviceFormInitState;
export type ServiceFormFields = keyof ServiceFormState;

export type OtherFormState = typeof otherFormInitState;
export type OtherFormFields = keyof OtherFormState;

export type RepeatFormState = typeof repeatFormInitState;
export type RepeatFormFields = keyof RepeatFormState;

export type DetailsFormState = {
	services: ServiceDetails[];
	spares: ServiceDetails[];
};
export type DetailsFormFields = keyof DetailsFormState;
