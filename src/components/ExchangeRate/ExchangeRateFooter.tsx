import * as React from "react";
import styled, { css } from "styled-components";
import { StyledSection } from "./Common";
import { ExchangeRateContext } from "./context";

const StyledLayout = styled(StyledSection)`
	display: flex;
	justify-content: space-between;
	padding: 5px;
`;

type ExchangeRateFooterProps = {
	onCancel?: () => void;
	onSubmit: () => void;
};

const StyledButton = styled.button`
	${({ view }: { view?: "primary" }) =>
		view === "primary"
			? css`
					background-color: #4caf50;
					color: white;
			  `
			: css`
					background-color: white;
			  `};
	border: 1px solid rgba(0, 0, 0, 0.1);
	padding: 5px 22px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 16px;
`;
export const ExchangeRateFooter: React.StatelessComponent<
	ExchangeRateFooterProps
> = ({ onCancel, onSubmit }) => (
	<ExchangeRateContext.Consumer>
		{({ from, to, ratio }) => (
			<StyledLayout>
				<StyledButton onClick={() => onCancel && onCancel()}>
					Cancel
				</StyledButton>
				<StyledButton
					view="primary"
					onClick={() => onSubmit && onSubmit()}
				>
					Submit
				</StyledButton>
			</StyledLayout>
		)}
	</ExchangeRateContext.Consumer>
);
