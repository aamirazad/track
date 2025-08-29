/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
	typescript: {
		ignoreBuildErrors: true,
	},

	eslint: {
		ignoreDuringBuilds: true,
	},
  allowedDevOrigins: ['3000.aamira.me'],
};

export default config;
