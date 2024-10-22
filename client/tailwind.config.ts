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
				blue: '#dcdcf0',
				white: '#3553a1',
				purple: '#260047',
				darkPurple: '0a0019',
				background: 'var(--background)',
				foreground: 'var(--foreground)',
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
