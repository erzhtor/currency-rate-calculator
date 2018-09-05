import * as React from "react";
import styled from "styled-components";
import { ExchangeRateContext, ExchangeRateContextDto } from "./context";
import { ExchangeRateFrom } from "./ExchangeRateFrom";
import { ExchangeRateHeader } from "./ExchangeRateHeader";
import { ExchangeRateTo } from "./ExchangeRateTo";

type ExchangeRateProps = ExchangeRateContextDto;

const StyledLayout = styled.article`
	border: 1px dashed black;
	width: 500px;
`;

export class ExchangeRate extends React.Component<ExchangeRateProps> {
	public static Header = ExchangeRateHeader;
	public static From = ExchangeRateFrom;
	public static To = ExchangeRateTo;

	render() {
		const { children } = this.props;
		return (
			<ExchangeRateContext.Provider value={this.props}>
				<StyledLayout>{children}</StyledLayout>
			</ExchangeRateContext.Provider>
		);
	}
}
