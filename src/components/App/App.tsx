import * as React from "react";
import styled from "styled-components";
import { ExchangeRateWidget } from "../ExchangeRateWidget";
import "./App.css";
import logo from "./logo.svg";

const StyledLayout = styled.div`
	text-align: center;
`;

const StyledHeader = styled.header`
	background-color: #222;
	height: 150px;
	padding: 20px;
	color: white;
`;

const StyledWidgetContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	margin: 10px;
`;

class App extends React.Component {
	public render() {
		return (
			<StyledLayout>
				<StyledHeader>
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Currency Exchange Rate Widget</h1>
				</StyledHeader>
				<StyledWidgetContainer>
					<ExchangeRateWidget apiUrl="https://api.exchangeratesapi.io/latest" />
				</StyledWidgetContainer>
			</StyledLayout>
		);
	}
}

export default App;
