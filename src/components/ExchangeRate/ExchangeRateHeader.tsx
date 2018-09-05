import * as React from "react";
import { getCurrencySymbol } from "../../lib";
import { ExchangeRateContext } from "./context";

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
