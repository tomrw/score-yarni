import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';

import App from './components/app';
import { persistor, store } from './store';

export default class AppEntry extends Component {
	componentDidMount() {
		SplashScreen.hide();
	}

	render() {
		return (
			<Provider store={ store }>
				<PersistGate persistor={ persistor }>
					<App />
				</PersistGate>
			</Provider>
		);
	}
}
