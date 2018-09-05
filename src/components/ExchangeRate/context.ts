import * as React from "react";
import { Currency } from "../../enums/Currency";

export type ExchangeRateContextDto = {
	ratio?: number;
	amount?: number;
	from: Currency;
	to: Currency;
	currencies: Currency[];
};

const defaultExchangeRateContextValue: ExchangeRateContextDto = {
	ratio: 1,
	from: Currency.USD,
	to: Currency.GBP,
	currencies: []
};

export const ExchangeRateContext = React.createContext<ExchangeRateContextDto>(
	defaultExchangeRateContextValue
);
