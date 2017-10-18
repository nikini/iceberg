import React from 'react';
// import PropTypes from 'prop-types';
// import autobind from 'autobind-decorator';

// Style
import './component.<%= dashName %>.scss';

// Components
// ...

export default class <%= className %>Component extends React.Component {
	/**
	 * Define the prop types for the component
	 *
	 * @type {Object}
	 */
	static propTypes = {};

	/**
	 * Define the default prop values for the component
	 *
	 * @type {Object}
	 */
	static defaultProps = {};

	/**
	 * Render the component
	 *
	 * @return {React.Component}
	 */
	render() {
		return (
			<div className="<%= cssClassName %>" />
		);
	}
}
