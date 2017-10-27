import React from 'react';
// import PropTypes from 'prop-types';
// import autobind from 'autobind-decorator';

// Style
import './component.home.scss';

// Helpers
import { t } from 'helpers/i18n';

export default class HomeComponent extends React.Component {
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
			<div className="home">
				<h4>{t('Created with Iceberg Packer')}</h4>
				<p>{t('This project has been generated using iceberg-packer.')}</p>
			</div>
		);
	}
}
