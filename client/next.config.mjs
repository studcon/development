/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				// @TODO: don't forget to setup for production
				protocol: 'http',
				hostname: 'localhost',
				port: '8000',
				pathname: '**',
			},
		],
	},
}

export default nextConfig
