import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import initialState from './initial-state';
import reducers from './reducers';
import { navigationMiddleware } from './navigation/redux';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: [ 'settings', 'currentGame', 'history' ]
};
const middlewares = [ thunk, logger, navigationMiddleware ];
const middleware = applyMiddleware(...middlewares);
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducer, initialState, middleware);
export const persistor = persistStore(store);
