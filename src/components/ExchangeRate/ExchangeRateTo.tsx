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

const StyledBalanceContainer = styled.div`
	font-size: 25px;
`;

function ResultAmount({ ratio, amount }: { amount?: number; ratio?: number }) {
	return (
		<StyledBalanceContainer>
			{ratio && amount ? `+${(amount * ratio).toFixed(2)}` : null}
		</StyledBalanceContainer>
	);
}

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
				</div>
				{!ratio && <div>No exchange rate available</div>}
				<ResultAmount amount={amount} ratio={ratio} />
				<div>
					You have {getCurrencySymbol(to)}
					{balance}
				</div>
			</StyledLayout>
		)}
	</ExchangeRateContext.Consumer>
);
