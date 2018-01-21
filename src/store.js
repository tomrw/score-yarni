import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';

import initialState from './initial-state';
import reducers from './reducers';

const middlewares = [ thunk, logger ];
const middleware = applyMiddleware(...middlewares);
const store = createStore(reducers, initialState, middleware);

export default store;
