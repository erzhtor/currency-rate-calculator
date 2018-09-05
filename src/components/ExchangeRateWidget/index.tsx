import axios from "axios";
import * as React from "react";
import * as ReactInterval from "react-interval";
import { Currency } from "../../enums";
import { getCurrencySymbol } from "../../lib";
import { Balance } from "../../types/Balance";
import { CurrencyRate } from "../../types/CurrencyRate";
import { ExchangeRate } from "../ExchangeRate";
import { AVAILABLE_CURRENCIES, CURRENT_BALANCE } from "./constants";

type ExchangeRateWidgetState = {
	rate?: CurrencyRate;
	from: Currency;
	to: Currency;
	amount?: number;
	balance: Balance;
};

type ExchangeRateWidgetProps = {
	apiUrl: string;
};

export class ExchangeRateWidget extends React.Component<
	ExchangeRateWidgetProps,
	ExchangeRateWidgetState
> {
	state: ExchangeRateWidgetState = {
		from: Currency.USD,
		to: Currency.GBP,
		balance: CURRENT_BALANCE
	};

	constructor(props: any) {
		super(props);
		this.fetchData = this.fetchData.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	async componentWillMount() {
		await this.fetchData();
	}

	onSubmit() {
		const { from, to, amount } = this.state;
		alert(`Converting ${getCurrencySymbol(from)}${amount} to ${to}`);
	}

	async fetchData() {
		const { from } = this.state;
		try {
			const { data } = await axios.get<CurrencyRate>(this.props.apiUrl, {
				params: {
					base: from,
					symbols: AVAILABLE_CURRENCIES
				}
			});
			this.setState({ rate: data });
		} catch (err) {
			console.error(err);
		}
	}

	public render() {
		const { rate, amount, from, to, balance } = this.state;
		if (!rate) {
			return "loading";
		}

		const ratio = from === to ? 1 : rate.rates[to];
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
						currencies={AVAILABLE_CURRENCIES}
					>
						<ExchangeRate.Header />
						<ExchangeRate.From
							onCurrencyChange={currency =>
								this.setState({ from: currency })
							}
							balance={balance[from]}
							onAmountChange={value =>
								this.setState({ amount: value })
							}
						/>
						<ExchangeRate.To
							balance={balance[to]}
							onCurrencyChange={currency =>
								this.setState({ to: currency })
							}
						/>
						<ExchangeRate.Footer
							onSubmit={this.onSubmit}
							onCancel={() => alert("canceled")}
						/>
					</ExchangeRate>
				)}
			</React.Fragment>
		);
	}
}
