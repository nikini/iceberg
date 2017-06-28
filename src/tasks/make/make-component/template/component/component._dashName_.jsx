import React from 'react';
import PropTypes from 'prop-types';

// Components
// ...

// Style
import './component.<%= dashName %>.scss';

export default class <%= className %>Component extends React.Component {
	/**
	 * Render the component
	 *
	 * @return {React.Component}
	 */
	render() {
		return (
			<div className="pa-<%= dashName %>" />
		);
	}
}

/**
 * Define the prop types for the component
 *
 * @type {Object}
 */
<%= className %>Component.propTypes = {
	// ...
};

/**
 * Define the default prop values for the component
 *
 * @type {Object}
 */
<%= className %>Component.defaultProps = {
	// ...
};
