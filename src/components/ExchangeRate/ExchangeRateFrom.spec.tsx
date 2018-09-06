import { configure, mount } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import { ExchangeRateFrom } from "./ExchangeRateFrom";

configure({ adapter: new Adapter() });

describe("ExchangeRateFrom", () => {
	it("renders without crashing", () => {
		const onCurrencyChange = jest.fn();
		const onAmountChange = jest.fn();

		const wrapper = mount(
			<ExchangeRateFrom
				onCurrencyChange={onCurrencyChange}
				onAmountChange={onAmountChange}
				balance={123}
			/>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
