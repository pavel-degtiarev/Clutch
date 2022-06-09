
export const cleanDecimal = (value: string): string => {
	const clearVal = value.replace(/[^0-9\,\.]/g, "").replace(/\,/, ".");
	const separators = clearVal.match(/\./g);
	if (separators && separators.length > 1) {
		return clearVal.replace(/\.$/, "");
	}
	return clearVal;
};

export const cleanNumeric = (value: string): string => {	
	return value.replace(/\D/g, "");
};
