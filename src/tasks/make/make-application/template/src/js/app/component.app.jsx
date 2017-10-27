import React from 'react';
import { Route } from 'react-router-dom';

// Style
import './component.app.scss';

// Components
import Header from './header/component.header';
import Footer from './footer/component.footer';
import Home from './pages/home/component.home';
import About from './pages/about/component.about';

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
				<div className="container">
					<Header />

					<main role="main">
						<Route exact path="/" component={Home} />
						<Route path="/about" component={About} />
					</main>

					<Footer />
				</div>
			</div>
		);
	}
}
