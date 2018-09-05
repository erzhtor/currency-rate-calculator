import * as React from "react";
import styled from "styled-components";
import { Currency } from "../../../enums/Currency";

const StyledContainer = styled.span``;

const StyledInput = styled.input`
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	display: inline-block;
	position: relative;
	background-color: #f1f1f1;
	color: #666;
	top: 10px;
	height: 30px;
	width: 30px;
	border: 0;
	border-radius: 50px;
	cursor: pointer;
	margin-right: 7px;
	outline: none;

	&:checked:before {
		position: absolute;
		font: 13px/1 "Open Sans", sans-serif;
		left: 11px;
		top: 7px;
		content: "\02143";
		transform: rotate(40deg);
	}

	&:hover {
		background-color: #f7f7f7;
	}

	&:checked {
		background-color: rgb(76, 175, 80, 0.6);
	}
`;

const StyledCheckMark = styled.label`
	font: 300 16px/1.7 "Open Sans", sans-serif;
	color: #666;
	cursor: pointer;
`;

export const CurrenciesRadio: React.StatelessComponent<{
	name: string;
	onChange: (currency: Currency) => void;
	value: Currency;
	currencies: Currency[];
}> = ({ currencies, value, onChange, name }) => (
	<React.Fragment>
		{currencies.map(currency => (
			<StyledContainer key={currency}>
				<StyledInput
					id={`${name}-${currency}`}
					name={name}
					type="radio"
					value={currency}
					checked={currency === value}
					onChange={event => onChange(event.target.value as Currency)}
				/>
				<StyledCheckMark htmlFor={`${name}-${currency}`}>
					{currency}
				</StyledCheckMark>
			</StyledContainer>
		))}
	</React.Fragment>
);
