/* global describe, it, expect, beforeEach */
import React from 'react';
import { mount } from 'enzyme';

import Home from './component.home';

describe('<Home>', () => {
	const props = {};

	let component;

	beforeEach(() => {
		component = mount(
			<Home {...props} />
		);
	});

	/**
	 * -------------------------------------------------------------------------
	 */

	it('should render component', () => {
		expect(component.find('.home').length).toEqual(1);
	});
});
