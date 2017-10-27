/* global describe, it, expect, beforeEach */
import React from 'react';
import { mount } from 'enzyme';

import About from './component.about';

describe('<About>', () => {
	const props = {};

	let component;

	beforeEach(() => {
		component = mount(
			<About {...props} />
		);
	});

	/**
	 * -------------------------------------------------------------------------
	 */

	it('should render component', () => {
		expect(component.find('.about').length).toEqual(1);
	});
});
