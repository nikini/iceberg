import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// Helpers
import { setLocale } from 'helpers/date';
import { getStore } from 'helpers/store';

// Import the root reducer, root saga and default state (to create the store)
import reducers from './reducers';
import sagas from './sagas';
import defaultStore from './default-store';

// Application
import App from './app/component.app';

export default class RootContainer extends React.Component {
	/**
	 * Called only once, first time, before the components renders
	 *
	 * @return {[type]}
	 */
	componentWillMount() {
		// Set the locale for moment js
		setLocale({
			lang: this.props.lang,
		});
	}

	/**
	 * Render the component
	 *
	 * @return {React.Component}
	 */
	render() {
		const store = getStore(defaultStore, reducers, sagas);
		return (
			<Provider store={store}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>
		);
	}
}
