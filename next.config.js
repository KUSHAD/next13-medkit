const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production',
	},
	images: {
		imageSizes: [1024, 1024],
		domains: ['utfs.io'],
	},
};

module.exports = withBundleAnalyzer(nextConfig);
