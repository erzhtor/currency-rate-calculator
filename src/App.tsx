import axios from "axios";
import * as React from "react";
import * as ReactInterval from "react-interval";

import "./App.css";

import logo from "./logo.svg";

class App extends React.Component<any, any> {
	state: any = {};

	constructor(props: any) {
		super(props);
		this.fetchData = this.fetchData.bind(this);
	}

	async componentWillMount() {
		await this.fetchData();
	}

	async fetchData() {
		try {
			const { data } = await axios.get<any>(
				"https://api.exchangeratesapi.io/latest",
				{
					params: {
						base: "USD",
						symbols: ["USD", "GBP", "EUR"]
					}
				}
			);
			this.setState({ data });
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
				<pre>{JSON.stringify(this.state.data)}</pre>
			</div>
		);
	}
}

export default App;
