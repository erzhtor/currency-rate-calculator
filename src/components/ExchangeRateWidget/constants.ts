import { Currency } from "../../enums";
import { Balance } from "../../types/Balance";

export const AVAILABLE_CURRENCIES = [Currency.GBP, Currency.USD, Currency.EUR];

export const CURRENT_BALANCE: Balance = {
	[Currency.EUR]: 3333333.123,
	[Currency.GBP]: 2222222.234,
	[Currency.USD]: 1111111.34
};
