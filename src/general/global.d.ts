declare module "*.scss";
declare module "*.svg";

// ===========================================

type clickHandler = (event: React.MouseEvent<HTMLElement>) => void;

type FormValidations<T extends string> = {
	[key in T]?: (value: string | boolean) => void;
};

type FormFields<T extends string> = { [key in T]: string };

interface Checkpoint<T extends TargetFormState> {
	(state: T): boolean;
}

type ServiceDetails = {
	id: number;
	title: string;
	price: number;
};

type ActionCreatorType<T> = T extends { [key: string]: infer U } ? U : never;
