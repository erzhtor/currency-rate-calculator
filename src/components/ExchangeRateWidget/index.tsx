import axios from "axios";
import * as React from "react";
import * as ReactInterval from "react-interval";
import { Currency } from "../../enums";
import { Balance } from "../../types/Balance";
import { CurrencyRate } from "../../types/CurrencyRate";
import { ExchangeRate } from "../ExchangeRate";

type ExchangeRateWidgetState = {
	rate?: CurrencyRate;
	from: Currency;
	to: Currency;
	amount?: number;
};

type ExchangeRateWidgetProps = {
	apiUrl: string;
	onCancel: () => void;
	onSubmit: (
		param: {
			from: Currency;
			to: Currency;
			amount?: number;
			ratio?: number;
		}
	) => void;
	currencies: Currency[];
	defaultFrom: Currency;
	defaultTo: Currency;
	balance: Balance;
};

export class ExchangeRateWidget extends React.Component<
	ExchangeRateWidgetProps,
	ExchangeRateWidgetState
> {
	constructor(props: ExchangeRateWidgetProps) {
		super(props);
		this.fetchData = this.fetchData.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		const { defaultFrom, defaultTo } = props;
		this.state = {
			from: defaultFrom,
			to: defaultTo
		};

		this.getExchangeRatio = this.getExchangeRatio.bind(this);
	}

	async componentWillMount() {
		await this.fetchData();
	}

	handleSubmit() {
		const { from, to, amount } = this.state;
		const { onSubmit } = this.props;
		const ratio = this.getExchangeRatio();
		onSubmit({ ratio, from, to, amount });
	}

	async fetchData() {
		const { from } = this.state;
		const { currencies } = this.props;
		try {
			const { data } = await axios.get<CurrencyRate>(this.props.apiUrl, {
				params: {
					base: from,
					symbols: currencies
				}
			});
			this.setState({ rate: data });
		} catch (err) {
			console.error(err);
		}
	}

	getExchangeRatio() {
		const { rate, from, to } = this.state;
		if (!rate) {
			return;
		}

		const ratio = from === to ? 1 : rate.rates[to];

		return ratio;
	}

	public render() {
		const { rate, amount, from, to } = this.state;
		if (!rate) {
			return "loading";
		}

		const ratio = this.getExchangeRatio();
		const { onCancel, currencies, balance } = this.props;
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
						currencies={currencies}
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
							onSubmit={this.handleSubmit}
							onCancel={onCancel}
						/>
					</ExchangeRate>
				)}
			</React.Fragment>
		);
	}
}
