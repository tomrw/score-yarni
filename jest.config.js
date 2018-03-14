module.exports = {
	collectCoverage: true,
	coverageDirectory: 'coverage',
	preset: 'react-native',
	setupTestFrameworkScriptFile: './tests/setup.js',
	'transformIgnorePatterns': [
		'node_modules/(?!(jest-)?react-native|react-navigation)'
	]
};
