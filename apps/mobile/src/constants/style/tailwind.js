const COLORS = require('./Colors');

module.exports = function (theme) {
	return {
		content: ['./src/screens/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}', 'App.tsx'],
		theme: {
			extend: {
				colors: theme ? COLORS[theme] : COLORS.dark,
				fontSize: {
					md: '16px',
				},
			}
		},
		variants: {
			extend: {}
		},
		plugins: []
	};
};
