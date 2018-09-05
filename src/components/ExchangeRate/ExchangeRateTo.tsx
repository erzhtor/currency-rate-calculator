import * as React from "react";
import styled from "styled-components";
import { Currency } from "../../enums/Currency";
import { getCurrencySymbol } from "../../lib";
import { CurrenciesRadio } from "./Common";
import { ExchangeRateContext } from "./context";

const StyledLayout = styled.section`
	display: flex;
	flex-direction: column;
	height: 100px;
	justify-content: space-around;
	border: 1px dashed black;
`;

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
			<StyledLayout>
				<div>
					<CurrenciesRadio
						currencies={currencies}
						value={to}
						onChange={onCurrencyChange}
						name="currency-to"
					/>
					<div>
						{!ratio && "No exchange rate available"}
						{ratio && amount ? amount * ratio : null}
					</div>
				</div>
				<div>
					You have {getCurrencySymbol(to)}
					{balance}
				</div>
			</StyledLayout>
		)}
	</ExchangeRateContext.Consumer>
);
