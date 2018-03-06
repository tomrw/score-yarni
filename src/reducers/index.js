import { combineReducers } from 'redux';

import config from './config';
import layout from './layout';
import leaderboard from './leaderboard';
import players from './players';
import scores from './score';
import settings from './settings';

export default combineReducers({
	currentGame: combineReducers({
		config,
		leaderboard,
		players,
		scores
	}),
	layout,
	settings
});
