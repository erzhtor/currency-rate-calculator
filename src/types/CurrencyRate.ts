import { Currency } from "../enums/Currency";

export type CurrencyRate = {
	base: Currency;
	rates: { [key in Currency]?: number };
};
