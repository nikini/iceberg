import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { isDevelopment } from 'helpers/environment';

export const getStore = (defaultState, rootReducer, rootSaga) => {
	// Create the saga middleware
	const sagaMiddleware = createSagaMiddleware();
	const middleware = [sagaMiddleware];

	const enhancers = compose(
		applyMiddleware(...middleware),
		isDevelopment() && window.devToolsExtension ? window.devToolsExtension() : f => f,
	);
	const store = createStore(rootReducer, defaultState, enhancers);

	// Run the saga
	sagaMiddleware.run(rootSaga);

	// Return the previous store
	return store;
};
