import * as React from "react";
import { Currency } from "../../../enums/Currency";

export const CurrenciesRadio: React.StatelessComponent<{
	name: string;
	onChange: (currency: Currency) => void;
	value: Currency;
	currencies: Currency[];
}> = ({ currencies, value, onChange }) => (
	<React.Fragment>
		{currencies.map(currency => (
			<span key={currency}>
				<input
					type="radio"
					name={name}
					value={currency}
					checked={currency === value}
					onChange={event => onChange(event.target.value as Currency)}
				/>
				{currency}
			</span>
		))}
	</React.Fragment>
);
