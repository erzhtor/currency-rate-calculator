import * as React from "react";
import { Currency } from "../../enums/Currency";
import { getCurrencySymbol } from "../../lib";
import { ExchangeRateContext } from "./context";

type ExchangeRateFromProps = {
	onCurrencyChange: (currency: Currency) => void;
	onAmountChange: (amount: number) => void;
	balance: number;
};

export const ExchangeRateFrom: React.StatelessComponent<
	ExchangeRateFromProps
> = ({ onAmountChange, balance, onCurrencyChange }) => (
	<ExchangeRateContext.Consumer>
		{({ from, amount, currencies }) => (
			<div>
				<div>
					{from}
					<select
						value={from}
						onChange={event =>
							onCurrencyChange(event.target.value as Currency)
						}
					>
						{currencies.map(currency => (
							<option value={currency} key={currency}>
								{currency}
							</option>
						))}
					</select>
					<input
						type="number"
						value={amount}
						onChange={event =>
							onAmountChange(parseFloat(event.target.value))
						}
					/>
				</div>
				<div>
					You have {getCurrencySymbol(from)}
					{balance}
				</div>
			</div>
		)}
	</ExchangeRateContext.Consumer>
);
