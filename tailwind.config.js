import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#FF8484',
				'content-bg': '#282A36',
				secondary: '#D97398',
			},
		},
	},
	plugins: [daisyui, require('tailwindcss-animated')],
	daisyui: {
		themes: ['dracula'],
	},
}
