import { configure, shallow } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import sinon from "sinon";
import { ExchangeRate } from ".";
import { Currency } from "../../enums/Currency";

configure({ adapter: new Adapter() });

it("renders without crashing", () => {
	const handleSubmit = jest.fn();
	const wrapper = shallow(
		<ExchangeRate
			amount={123}
			from={Currency.USD}
			to={Currency.USD}
			ratio={1}
			currencies={[Currency.USD, Currency.GBP, Currency.EUR]}
		>
			<ExchangeRate.Header />
			<ExchangeRate.From
				onCurrencyChange={currency =>
					console.log("Changed from currency", currency)
				}
				balance={111}
				onAmountChange={value =>
					console.log("Changed amount value", value)
				}
			/>
			<ExchangeRate.To
				balance={111}
				onCurrencyChange={currency =>
					console.log("Changed to currency", currency)
				}
			/>
			<ExchangeRate.Footer onSubmit={() => console.log("submitted")} />
		</ExchangeRate>
	);

	expect(wrapper).toMatchSnapshot();
});
