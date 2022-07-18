import dayjs from "dayjs";
import { timeSlotOptions } from "../general/global.var";

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

export const ServiceFormInitState = {
	serviceDate: dayjs().format("YYYY-MM-DD"),
	serviceDescription: "",
	serviceRun: "",
	serviceTotal: "",
	serviceRepeat: false,
};

export const otherFormInitState = {
	otherDate: dayjs().format("YYYY-MM-DD"),
	otherTitle: "",
	otherPrice: "",
};

export const ServiceRepeatFormInitState = {
	repeatingRun: "",
	repeatingTime: "",
	repeatByRun: false,
	repeatByTime: false,
	repeatTimeSlot: timeSlotOptions[1].value,
};

export const ServiceDetailsFormInitState = {
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

export type ServiceFormState = typeof ServiceFormInitState;
export type ServiceFormFields = keyof ServiceFormState;

export type OtherFormState = typeof otherFormInitState;
export type OtherFormFields = keyof OtherFormState;

export type ServiceRepeatFormState = typeof ServiceRepeatFormInitState;
export type ServiceRepeatFormFields = keyof ServiceRepeatFormState;

export type ServiceDetailsFormState = {
	services: ServiceDetails[];
	spares: ServiceDetails[];
};
export type ServiceDetailsFormFields = keyof ServiceDetailsFormState;
