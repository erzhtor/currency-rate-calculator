import * as React from "react";
import styled from "styled-components";
import { Currency } from "../../enums/Currency";
import { getCurrencySymbol } from "../../lib";
import { CurrenciesRadio, StyledSection } from "./Common";
import { ExchangeRateContext } from "./context";

const StyledLayout = styled(StyledSection)`
	display: flex;
	flex-direction: column;
	height: 150px;
	justify-content: space-around;
`;

const StyledInput = styled.input`
	font-size: 24px;
	width: 150px;
	margin: 0 auto;
	text-align: center;
`;

type ExchangeRateFromProps = {
	onCurrencyChange: (currency: Currency) => void;
	onAmountChange: (amount: number) => void;
	balance: number;
};

function toNegative(value?: number) {
	if (!value) {
		return value;
	}

	return -Math.abs(value);
}

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
						name="currency-from"
					/>
				</div>
				<StyledInput
					type="number"
					value={toNegative(amount)}
					onChange={event =>
						onAmountChange(Math.abs(parseFloat(event.target.value)))
					}
				/>
				<div>
					You have {getCurrencySymbol(from)}
					{balance}
				</div>
			</StyledLayout>
		)}
	</ExchangeRateContext.Consumer>
);
