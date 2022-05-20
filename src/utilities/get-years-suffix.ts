import { YearSuffix } from "../../global.var";

export default function getYearsSuffix(time: TimeType): YearSuffix {
	const lastDigit = +time.interval.toString().slice(-1);

	switch (true) {
		case lastDigit == 1:
			return YearSuffix.SINGLE;

		case lastDigit >= 2 && lastDigit <= 4:
			return YearSuffix.MULTIPLE;

		case lastDigit >= 5:
			return YearSuffix.LONG;
  }
  
  return YearSuffix.LONG; // вариант "0"
}
