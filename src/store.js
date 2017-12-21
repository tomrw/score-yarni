import logger from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';

import initialState from './initial-state';
import reducers from './reducers';

const middleware = applyMiddleware(logger);
const store = createStore(reducers, initialState, middleware);

export default store;
