import { combineReducers } from 'redux';

import game from './game';
import layout from './layout';
import players from './players';

export default combineReducers({
	game,
	layout,
	players
});
