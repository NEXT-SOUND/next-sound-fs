export default () => ({
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  BACKEND_URL:
    process.env.NODE_ENV === 'production'
      ? process.env.BACKEND_URL
      : process.env.BACKEND_LOCAL_URL,
  FRONTEND_URL:
    process.env.NODE_ENV === 'production'
      ? process.env.FRONTEND_URL
      : process.env.FRONTEND_LOCAL_URL,
  COOKIE_DOMAIN:
    process.env.NODE_ENV === 'production'
      ? process.env.COOKIE_DOMAIN
      : process.env.COOKIE_LOCAL_DOMAIN,
});
