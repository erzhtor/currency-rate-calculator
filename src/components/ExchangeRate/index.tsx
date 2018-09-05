import * as React from "react";
import { ExchangeRateContext, ExchangeRateContextDto } from "./context";
import { ExchangeRateFrom } from "./ExchangeRateFrom";
import { ExchangeRateHeader } from "./ExchangeRateHeader";
import { ExchangeRateTo } from "./ExchangeRateTo";

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
