import { combineReducers } from 'redux';

import config from './config';
import history from './history';
import leaderboard from './leaderboard';
import nav from './nav';
import players from './players';
import scores from './score';
import status from './status';
import settings from './settings';

export default combineReducers({
	currentGame: combineReducers({
		config,
		leaderboard,
		players,
		scores,
		status
	}),
	history,
	nav,
	settings
});
