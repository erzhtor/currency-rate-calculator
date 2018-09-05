import * as React from "react";
import * as ReactDOM from "react-dom";
import { ExchangeRateWidget } from ".";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(
		<ExchangeRateWidget apiUrl="https://api.exchangeratesapi.io/latest" />,
		div
	);
	ReactDOM.unmountComponentAtNode(div);
});
