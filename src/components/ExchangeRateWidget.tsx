import axios from "axios";
import * as React from "react";
import * as ReactInterval from "react-interval";
import "./App.css";
import logo from "./logo.svg";

type ExchangeRateWidgetState = {
	rates: any[];
};

type ExchangeRateWidgetProps = {
	apiUrl: string;
};

export class ExchangeRateWidget extends React.Component<
	ExchangeRateWidgetProps,
	ExchangeRateWidgetState
> {
	state: ExchangeRateWidgetState = {
		rates: []
	};

	constructor(props: any) {
		super(props);
		this.fetchData = this.fetchData.bind(this);
	}

	async componentWillMount() {
		await this.fetchData();
	}

	async fetchData() {
		try {
			const { data } = await axios.get<any>(this.props.apiUrl, {
				params: {
					base: "USD",
					symbols: ["USD", "GBP", "EUR"]
				}
			});
			this.setState({ rates: data });
		} catch (err) {
			console.error(err);
		}
	}

	public render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<ReactInterval
					enabled={true}
					timeout={10000}
					callback={this.fetchData}
				/>
				{JSON.stringify(this.state.rates)}
			</div>
		);
	}
}
