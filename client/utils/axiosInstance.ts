import axios from 'axios'
import Cookies from 'js-cookie'

const axiosInstance = axios.create({
	// @TODO: fix getting server url from .env
	// baseURL: process.env.SERVER_BASE_URL,
	baseURL: 'http://127.0.0.1:8000/api',
})

axiosInstance.interceptors.request.use(
	config => {
		const userId = Cookies.get('user_id')
		const role = Cookies.get('role')

		if (userId && role) {
			config.headers['user_id'] = userId
			config.headers['role'] = role
		}
		return config
	},
	error => {
		return Promise.reject(error)
	},
)

axiosInstance.interceptors.response.use(
	response => {
		if (response.data.user_id && response.data.role) {
			Cookies.set('user_id', response.data.user_id)
			Cookies.set('role', response.data.role)
		}
		return response
	},
	error => Promise.reject(error),
)

export default axiosInstance
