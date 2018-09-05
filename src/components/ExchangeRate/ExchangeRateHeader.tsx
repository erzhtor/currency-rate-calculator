import * as React from "react";
import styled from "styled-components";
import { getCurrencySymbol } from "../../lib";
import { StyledSection } from "./Common";
import { ExchangeRateContext } from "./context";

const StyledLayout = styled(StyledSection)`
	display: flex;
	justify-content: center;
	background-color: #197cdf;
	color: white;
	padding: 15px 0;
	font-size: 20px;
`;
export const ExchangeRateHeader: React.StatelessComponent = () => (
	<ExchangeRateContext.Consumer>
		{({ from, to, ratio }) => (
			<StyledLayout>
				{getCurrencySymbol(from)}
				1=
				{getCurrencySymbol(to)}
				{ratio || "na"}
			</StyledLayout>
		)}
	</ExchangeRateContext.Consumer>
);
