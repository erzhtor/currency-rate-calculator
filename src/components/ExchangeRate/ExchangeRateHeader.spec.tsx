import { configure, mount } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import { ExchangeRateHeader } from "./ExchangeRateHeader";

configure({ adapter: new Adapter() });

describe("ExchangeRateHeader", () => {
	it("renders without crashing", () => {
		const wrapper = mount(<ExchangeRateHeader />);
		expect(wrapper).toMatchSnapshot();
	});
});
