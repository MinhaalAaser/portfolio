/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ["@mdxeditor/editor"],
	reactStrictMode: true,
	output: "export",
	images: {
		unoptimized: true, // Disable server-side image optimization
	},
	webpack: (config) => {
		// this will override the experiments
		config.experiments = { ...config.experiments, topLevelAwait: true };
		// this will just update topLevelAwait property of config.experiments
		// config.experiments.topLevelAwait = true
		return config;
	},
};

export default nextConfig;
