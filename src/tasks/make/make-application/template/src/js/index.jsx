import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import RootContainer from './component.root-container';

const render = (Component) => {
	ReactDOM.render((
		<AppContainer>
			<Component lang={document.body.lang} />
		</AppContainer>
	), document.querySelector('#app'));
};

render(RootContainer);

if (module && module.hot)
	module.hot.accept('./component.root-container', () => { render(RootContainer); });
