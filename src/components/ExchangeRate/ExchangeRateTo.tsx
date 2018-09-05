import * as React from "react";
import styled from "styled-components";
import { Currency } from "../../enums/Currency";
import { getCurrencySymbol } from "../../lib";
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
			</StyledLayout>
		)}
	</ExchangeRateContext.Consumer>
);
