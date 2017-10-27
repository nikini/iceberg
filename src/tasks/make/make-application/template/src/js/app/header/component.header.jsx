import React from 'react';
import { NavLink } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import autobind from 'autobind-decorator';

// Style
import './component.header.scss';

// Helpers
import { t } from 'helpers/i18n';

export default class HeaderComponent extends React.Component {
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
			<header className="header clearfix">
				<nav>
					<ul className="nav nav-pills float-right">
						<li className="nav-item">
							<NavLink
								exact
								to="/"
								className="nav-link"
								activeClassName="active"
							>
								{t('Home')}
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								exact
								to="/about"
								className="nav-link"
								activeClassName="active"
							>
								{t('About')}
							</NavLink>
						</li>
					</ul>
				</nav>

				<h3>{t('<%= humanName %>')}</h3>
			</header>
		);
	}
}
