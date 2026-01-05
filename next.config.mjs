/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages
  // Note: API routes will not work with static export. 
  // Deploy to Vercel if you need the /api/hevy/* endpoints to function.
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig