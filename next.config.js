/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}


module.exports = { nextConfig, env: {
  DATABASE_URL: process.env.DATABASE_URL} }
