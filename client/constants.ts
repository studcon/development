import { StylesConfig } from 'react-select'

export const MARKDOWN_VIEWER_STYLES: React.CSSProperties = {
	whiteSpace: 'pre-wrap',
	background: 'none',
}
// @TODO: hide server link to .env
export const AVATARS_URL = 'http://localhost:8000/avatars/'
export const PROJECTS_URL = 'http://localhost:8000/projects/'

export const selectStyles: StylesConfig = {
	control: styles => ({
		...styles,
		backgroundColor: '#0a0019',
		border: 'none',
		fontSize: '15px',
	}),

	container: styles => ({
		...styles,
		backgroundColor: '#0a0019',
		border: 'none',
		marginTop: '10px',
		marginBottom: '20px',
	}),

	option: styles => ({
		...styles,
		backgroundColor: '#0a0019',
		border: 'none',
	}),

	menu: styles => ({
		...styles,
		backgroundColor: '#0a0019',
		border: 'none',
		fontSize: '15px',
	}),

	placeholder: styles => ({
		...styles,
		fontSize: '15px',
	}),
}
