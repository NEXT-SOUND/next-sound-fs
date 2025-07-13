const GLOBAL_ENV = {
  production: {
    BACKEND_URL: "https://api.yourdomain.com",
    FRONTEND_URL: "https://next-sound-fe-web.vercel.app/",
    COOKIE_DOMAIN: "next-sound-fe-web.vercel.app",
  },
  development: {
    BACKEND_URL: "http://localhost:5024",
    FRONTEND_URL: "http://localhost:3000",
    COOKIE_DOMAIN: "localhost",
  },
  test: {
    BACKEND_URL: "https://api.yourdomain.com",
    FRONTEND_URL: "https://next-sound-fe-web.vercel.app/",
    COOKIE_DOMAIN: "next-sound-fe-web.vercel.app",
  },
}[process.env.NODE_ENV || "development"]!;

export default GLOBAL_ENV;