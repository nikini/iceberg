/* global angular, describe, it, expect, beforeEach, afterEach */

import './<%= dashName %>-component';

describe('component: <%= camelCaseName %>', () => {
	let $compile;
	let $rootScope;
	let element;
	let elementScope;

	// Mock the module
	beforeEach(angular.mock.module('pa'));

	// Inject the needed stuff (if any)
	beforeEach(angular.mock.inject((_$compile_, _$rootScope_) => {
		$compile = _$compile_;
		$rootScope = _$rootScope_;

		// Compile a piece of HTML containing the component
		element = $compile(`<<%= dashName %>
		></<%= dashName %>>`)($rootScope);

		// Digest the scope
		$rootScope.$digest();

		// Get element scope
		elementScope = element.isolateScope();
	}));

	// -------------------------------------------------------------------------

	it('replaces the element properly', () => {
		expect(element.html()).toContain('...');
	});

	// -------------------------------------------------------------------------

	it('should have a test', () => {
		expect(true).toBe(false);
	});
});
