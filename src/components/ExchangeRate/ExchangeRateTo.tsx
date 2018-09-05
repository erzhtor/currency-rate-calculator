import * as React from "react";
import { Currency } from "../../enums/Currency";
import { getCurrencySymbol } from "../../lib";
import { ExchangeRateContext } from "./context";

type ExchangeRateToProps = {
	onCurrencyChange: (currency: Currency) => void;
	balance: number;
};

export const ExchangeRateTo: React.StatelessComponent<ExchangeRateToProps> = ({
	onCurrencyChange,
	balance
}) => (
	<ExchangeRateContext.Consumer>
		{({ to, amount, ratio, currencies }) => (
			<div>
				<div>
					<select
						value={to}
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
					<span>{amount ? amount * ratio : null}</span>
				</div>
				<div>
					You have {getCurrencySymbol(to)}
					{balance}
				</div>
			</div>
		)}
	</ExchangeRateContext.Consumer>
);
