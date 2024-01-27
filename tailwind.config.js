import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#FF8484',
				'content-bg': '#282828',
				secondary: '#D97398',
			},
		},
	},
	plugins: [daisyui],
	daisyui: {
		themes: [],
	},
}
