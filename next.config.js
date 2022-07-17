/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig

// next-transpile-modules, beginning
const withTM = require('next-transpile-modules')(['hashconnect']);

module.exports = withTM({});
// next-transpile-modules, end