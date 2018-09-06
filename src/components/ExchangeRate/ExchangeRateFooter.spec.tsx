import { configure, mount } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import { ExchangeRateFooter } from "./ExchangeRateFooter";

configure({ adapter: new Adapter() });

describe("ExchangeRateFooter", () => {
	it("renders without crashing", () => {
		const handleCancel = jest.fn();
		const handleSubmit = jest.fn();
		const wrapper = mount(
			<ExchangeRateFooter
				onCancel={handleCancel}
				onSubmit={handleSubmit}
			/>
		);
		expect(wrapper).toMatchSnapshot();

		const buttons = wrapper.find("button");
		expect(buttons.length).toBe(2);

		const submitButton = buttons.at(0);
		const cancelButton = buttons.at(1);

		cancelButton.simulate("click");
		expect(handleSubmit).toHaveBeenCalledTimes(1);

		submitButton.simulate("click");
		expect(handleSubmit).toHaveBeenCalledTimes(1);
	});
});
