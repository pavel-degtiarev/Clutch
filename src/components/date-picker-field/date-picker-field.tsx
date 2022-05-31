import React from "react";
import dayjs from "dayjs";
import Field from "../field/field";

type DatePickerProps = {
	name: string;
	label: string;
	auxStyles: string;
};

export default function DatePickerField({ name, label, auxStyles }: DatePickerProps) {
	function click() {
		console.log("click");
	}

	return (
		<Field
			name={name}
			label={label}
			auxStyles={auxStyles}
			value={dayjs().format("DD MMM YYYY")}
			clickHandler={click}
		/>
	);
}
