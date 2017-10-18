/* global describe, it, expect, beforeEach, jest */
import React from 'react';
import { mount } from 'enzyme';

import <%= className %> from './component.<%= dashName %>';

describe('<<%= className %>>', () => {
	const props = {};

	let component;

	beforeEach(() => {
		component = mount(
			<<%= className %> {...props} />
		);
	});

	/**
	 * -------------------------------------------------------------------------
	 */

	it('should render component', () => {
		expect(component.find('.<%= className %>').length).toEqual(1);
	});
});
