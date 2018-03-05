import { combineReducers } from 'redux';

import game from './game';
import layout from './layout';
import leaderboard from './leaderboard';
import players from './players';
import scores from './score';
import settings from './settings';

export default combineReducers({
	game,
	layout,
	leaderboard,
	players,
	scores,
	settings
});
