/* global describe, it, expect, beforeEach */
import React from 'react';
import { mount } from 'enzyme';
import App from './component.app';

describe('<App>', () => {
	const props = {
		// ...
	};

	let component;

	beforeEach(() => {
		component = mount(
			<App {...props} />
		);
	});

	/**
	 * -------------------------------------------------------------------------
	 */

	it('should render component', () => {
		expect(component.find('.app').length).toEqual(1);
	});
});
