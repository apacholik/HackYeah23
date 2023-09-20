const withTM = require("next-transpile-modules")(["ui", "utils"]);
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = (_phase, { defaultConfig }) => {
  const plugins = [withTM, withBundleAnalyzer];

  return plugins.reduce(
    (acc, plugin) => {
      if (Array.isArray(plugin)) {
        return plugin[0](acc, plugin[1]);
      }
      return plugin(acc);
    },
    {
      ...defaultConfig,
      ...nextConfig,
    }
  );
};
