import React from 'react';
// import PropTypes from 'prop-types';
// import autobind from 'autobind-decorator';

// Style
import './component.about.scss';

// Helpers
import { t } from 'helpers/i18n';

export default class AboutComponent extends React.Component {
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
			<div className="about">
				<h4>{t('About page')}</h4>
				<p>{t('Nothing to see here..')}</p>
			</div>
		);
	}
}
