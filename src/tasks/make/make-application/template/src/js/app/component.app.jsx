import React from 'react';
// import PropTypes from 'prop-types';
// import autobind from 'autobind-decorator';

// Style
import './component.app.scss';

// Helpers
import { t } from 'helpers/i18n';

export default class PaSelectComponent extends React.Component {
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
			<div className="app">
				<h1>{t('Welcome to Iceberg Packer')}</h1>
			</div>
		);
	}
}
