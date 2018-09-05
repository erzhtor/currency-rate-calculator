import * as React from "react";
import styled from "styled-components";
import { getCurrencySymbol } from "../../lib";
import { ExchangeRateContext } from "./context";

const StyledLayout = styled.section`
	border: 1px dashed black;
	display: flex;
	justify-content: center;
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
