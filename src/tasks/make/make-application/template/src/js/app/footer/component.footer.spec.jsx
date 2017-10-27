/* global describe, it, expect, beforeEach */
import React from 'react';
import { mount } from 'enzyme';

import Footer from './component.footer';

describe('<Footer>', () => {
	const props = {};

	let component;

	beforeEach(() => {
		component = mount(
			<Footer {...props} />
		);
	});

	/**
	 * -------------------------------------------------------------------------
	 */

	it('should render component', () => {
		expect(component.find('.footer').length).toEqual(1);
	});
});
