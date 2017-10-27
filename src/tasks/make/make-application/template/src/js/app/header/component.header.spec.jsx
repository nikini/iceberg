/* global describe, it, expect, beforeEach */
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import Header from './component.header';

describe('<Header>', () => {
	const props = {};

	let component;

	beforeEach(() => {
		component = mount(
			<MemoryRouter>
				<Header {...props} />
			</MemoryRouter>
		);
	});

	/**
	 * -------------------------------------------------------------------------
	 */

	it('should render component', () => {
		expect(component.find('.header').length).toEqual(1);
	});
});
