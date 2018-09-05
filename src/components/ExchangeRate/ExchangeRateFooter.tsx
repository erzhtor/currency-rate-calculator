import * as React from "react";
import styled from "styled-components";
import { ExchangeRateContext } from "./context";

const StyledLayout = styled.section`
	border: 1px dashed black;
	display: flex;
	justify-content: space-between;
`;

type ExchangeRateFooterProps = {
	onCancel?: () => void;
	onSubmit: () => void;
};
export const ExchangeRateFooter: React.StatelessComponent<
	ExchangeRateFooterProps
> = ({ onCancel, onSubmit }) => (
	<ExchangeRateContext.Consumer>
		{({ from, to, ratio }) => (
			<StyledLayout>
				<button onClick={() => onCancel && onCancel()}>Cancel</button>
				<button onClick={() => onSubmit && onSubmit()}>Submit</button>
			</StyledLayout>
		)}
	</ExchangeRateContext.Consumer>
);
