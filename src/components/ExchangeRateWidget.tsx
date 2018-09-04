import axios from "axios";
import * as React from "react";
import * as ReactInterval from "react-interval";
import { Currency } from "../enums";
import { CurrencyRate } from "../types/CurrencyRate";
import { ExchangeRate } from "./ExchangeRate";

type ExchangeRateWidgetState = {
	rate?: CurrencyRate;
	from: Currency;
	to: Currency;
	amount?: number;
};

type ExchangeRateWidgetProps = {
	apiUrl: string;
};

const CURRENCIES = [Currency.GBP, Currency.USD, Currency.EUR];

export class ExchangeRateWidget extends React.Component<
	ExchangeRateWidgetProps,
	ExchangeRateWidgetState
> {
	state: ExchangeRateWidgetState = {
		from: Currency.USD,
		to: Currency.GBP
	};

	constructor(props: any) {
		super(props);
		this.fetchData = this.fetchData.bind(this);
	}

	async componentWillMount() {
		await this.fetchData();
	}

	async fetchData() {
		const { from } = this.state;
		try {
			const { data } = await axios.get<CurrencyRate>(this.props.apiUrl, {
				params: {
					base: from,
					symbols: CURRENCIES
				}
			});
			this.setState({ rate: data });
		} catch (err) {
			console.error(err);
		}
	}

	public render() {
		const { rate, amount, from, to } = this.state;
		if (!rate) {
			return "loading";
		}

		const ratio = rate.rates[to];
		if (!ratio) {
			return "no exchange rate";
		}

		return (
			<React.Fragment>
				<ReactInterval
					enabled={true}
					timeout={10000}
					callback={this.fetchData}
				/>
				{rate && (
					<ExchangeRate
						amount={amount}
						from={from}
						to={to}
						ratio={ratio}
						currencies={CURRENCIES}
					>
						<ExchangeRate.Header />
						<ExchangeRate.From
							onCurrencyChange={currency =>
								this.setState({ from: currency })
							}
							onAmountChange={value =>
								this.setState({ amount: value })
							}
						/>
						<ExchangeRate.To
							onCurrencyChange={currency =>
								this.setState({ from: currency })
							}
						/>
					</ExchangeRate>
				)}
			</React.Fragment>
		);
	}
}
