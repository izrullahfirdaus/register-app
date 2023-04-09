/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    NEXT_APP_NAME: 'coba env',
    NEXT_API_URL: 'https://invit-server.herokuapp.com/api',
    NEXT_QR_LINK: 'https://register-app-nine.vercel.app/'
  }
}

module.exports = nextConfig
