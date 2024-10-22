import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			screens: {
				xl: '1920px',
				lg: '1080px',
			},
			colors: {
				blue: '#3553a2',
				white: '#dcdcf0',
				black: '#0a0019',
				purple: '#260047',
				lightPurple: '#3c006c',
				background: '#0a0019',
			},
			fontFamily: {
				regular: ['Euclid Circular B Regular'],
				bold: ['Euclid Circular B Bold'],
			},
		},
	},
	plugins: [],
}
export default config
