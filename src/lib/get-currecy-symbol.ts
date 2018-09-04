import { Currency } from "../enums/Currency";

const CURRENCY_SYMBOLS: { [key in Currency]: string } = {
	[Currency.USD]: "$",
	[Currency.GBP]: "£",
	[Currency.EUR]: "€"
};

export const getCurrencySymbol = (currency: Currency) =>
	CURRENCY_SYMBOLS[currency];
