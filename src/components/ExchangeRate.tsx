import * as React from "react";
import { Currency } from "../enums/Currency";
import { getCurrencySymbol } from "../lib";

const defaultExchangeRateContextValue: ExchangeRateContextDto = {
	ratio: 1,
	from: Currency.USD,
	to: Currency.GBP,
	currencies: []
};
const ExchangeRateContext = React.createContext<ExchangeRateContextDto>(
	defaultExchangeRateContextValue
);

type ExchangeRateContextDto = {
	ratio: number;
	amount?: number;
	from: Currency;
	to: Currency;
	currencies: Currency[];
};

export const ExchangeRateHeader: React.StatelessComponent = () => (
	<ExchangeRateContext.Consumer>
		{({ from, to, ratio }) => (
			<React.Fragment>
				<button>Cancel</button>
				<span>
					{getCurrencySymbol(from)}
					1=
					{getCurrencySymbol(to)}
					{ratio}
				</span>
				<button>Submit</button>
			</React.Fragment>
		)}
	</ExchangeRateContext.Consumer>
);

type ExchangeRateFromProps = {
	onCurrencyChange: (currency: Currency) => void;
	onAmountChange: (amount: number) => void;
};

export const ExchangeRateFrom: React.StatelessComponent<
	ExchangeRateFromProps
> = ({ onAmountChange }) => (
	<ExchangeRateContext.Consumer>
		{({ from, amount }) => (
			<div>
				<div>
					{from}{" "}
					<input
						type="number"
						value={amount}
						onChange={event =>
							onAmountChange(parseFloat(event.target.value))
						}
					/>
					{/* TODO: you have balance  */}
					{/* TODO: onCurrencyChange */}
				</div>
			</div>
		)}
	</ExchangeRateContext.Consumer>
);

type ExchangeRateToProps = {
	onCurrencyChange: (currency: Currency) => void;
};

export const ExchangeRateTo: React.StatelessComponent<ExchangeRateToProps> = ({
	onCurrencyChange
}) => (
	<ExchangeRateContext.Consumer>
		{({ to, amount, ratio }) => (
			<div>
				<div>
					{to} <span>{amount ? amount * ratio : null}</span>
					{/* TODO: you have balance  */}
					{/* TODO: onCurrencyChange */}
				</div>
			</div>
		)}
	</ExchangeRateContext.Consumer>
);

type ExchangeRateProps = ExchangeRateContextDto;

export class ExchangeRate extends React.Component<ExchangeRateProps> {
	public static Header = ExchangeRateHeader;
	public static From = ExchangeRateFrom;
	public static To = ExchangeRateTo;

	render() {
		const { children } = this.props;
		return (
			<ExchangeRateContext.Provider value={this.props}>
				{children}
			</ExchangeRateContext.Provider>
		);
	}
}
