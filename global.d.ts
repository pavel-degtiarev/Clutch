declare module "*.scss";
declare module "*.svg";

type TimeType = {
	interval: number;
	unit: TimelUnit;
};

type clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;
