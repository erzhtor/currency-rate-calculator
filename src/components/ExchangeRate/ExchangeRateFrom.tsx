import * as React from "react";
import styled from "styled-components";
import { Currency } from "../../enums/Currency";
import { getCurrencySymbol } from "../../lib";
import { CurrenciesRadio, StyledSection } from "./Common";
import { ExchangeRateContext } from "./context";

const StyledLayout = styled(StyledSection)`
	display: flex;
	flex-direction: column;
	height: 100px;
	justify-content: space-around;
`;

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
			<StyledLayout>
				<div>
					<CurrenciesRadio
						currencies={currencies}
						value={from}
						onChange={onCurrencyChange}
						name="currency-to"
					/>
				</div>
				<div>
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
			</StyledLayout>
		)}
	</ExchangeRateContext.Consumer>
);
