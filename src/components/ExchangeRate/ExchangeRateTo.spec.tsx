import { configure, mount } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import { ExchangeRateTo } from "./ExchangeRateTo";

configure({ adapter: new Adapter() });

describe("ExchangeRateTo", () => {
	it("renders without crashing", () => {
		const onCurrencyChange = jest.fn();

		const wrapper = mount(
			<ExchangeRateTo onCurrencyChange={onCurrencyChange} balance={123} />
		);
		expect(wrapper).toMatchSnapshot();
	});
});
