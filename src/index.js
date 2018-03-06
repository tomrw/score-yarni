import React from 'react';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';

import App from './components/app';
import { persistor, store } from './store';

const AppEntry = () =>
	<Provider store={ store }>
		<PersistGate persistor={ persistor }>
			<App />
		</PersistGate>
	</Provider>;

export default AppEntry;
