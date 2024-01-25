import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#FF8484',
			},
		},
	},
	plugins: [daisyui],
	daisyui: {
		themes: [],
	},
}
