import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { configure, mount } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import { ExchangeRateWidget } from ".";
import { Currency } from "../../enums/Currency";
import sinon from "sinon";

const apiUrl = "https://localhost/api/rates/latest";
const defaultFrom = Currency.USD;
const defaultTo = Currency.EUR;

// // This sets the mock adapter on the default instance
// const mock = new MockAdapter(axios);

// // Mock any GET request to /users
// // arguments for reply are (status, data, headers)
// mock.onGet(apiUrl).reply(200, {
// 	base: defaultFrom,
// 	date: "2018-09-05",
// 	rates: {
// 		GBP: 0.7799,
// 		EUR: 0.86341,
// 		USD: 1
// 	}
// });

configure({ adapter: new Adapter() });

describe("ExchangeRateWidget", () => {
	let handleSubmit: jest.Mock<{}>;
	let handleCancel: jest.Mock<{}>;

	const getComponent = () => (
		<ExchangeRateWidget
			apiUrl={apiUrl}
			currencies={[Currency.USD, Currency.GBP, Currency.EUR]}
			defaultFrom={defaultFrom}
			defaultTo={defaultTo}
			onCancel={handleCancel}
			onSubmit={handleSubmit}
			balance={{
				[Currency.EUR]: 123,
				[Currency.GBP]: 12322,
				[Currency.USD]: 12
			}}
		/>
	);

	beforeAll(() => {
		sinon
			.stub(axios, "get")
			.withArgs(apiUrl)
			.returns(
				new Promise(resolve => {
					return {
						base: defaultFrom,
						date: "2018-09-05",
						rates: {
							GBP: 0.7799,
							EUR: 0.86341,
							USD: 1
						}
					};
				})
			);
	});

	beforeEach(() => {
		handleSubmit = jest.fn();
		handleCancel = jest.fn();
	});

	it("renders without crashing", () => {
		const wrapper = mount(getComponent());

		const inputElement = wrapper.find("input");
		expect(inputElement).toBeTruthy();

		const submitButton = wrapper.find("button:first-child");
		expect(submitButton).toBeTruthy();

		const cancelButton = wrapper.find("button:last-child");
		expect(cancelButton).toBeTruthy();
		cancelButton.simulate("click");
		expect(handleSubmit).toHaveBeenCalledTimes(1);

		inputElement.simulate("change", { target: { value: "123" } });
		submitButton.simulate("click");
		expect(handleSubmit).toHaveBeenCalledTimes(1);
		// expect(handleSubmit).toHaveBeenCalledWith({
		// 	from: defaultFrom,
		// 	to: defaultTo,
		// 	amount: 123
		// });
		// expect(wrapper).toMatchSnapshot();
	});
});
