/* global describe, it, expect, beforeEach */
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import App from './component.app';

describe('<App>', () => {
	const props = {
		// ...
	};

	let component;

	beforeEach(() => {
		component = mount(
			<MemoryRouter>
				<App {...props} />
			</MemoryRouter>
		);
	});

	/**
	 * -------------------------------------------------------------------------
	 */

	it('should render component', () => {
		expect(component.find('.app').length).toEqual(1);
	});
});
