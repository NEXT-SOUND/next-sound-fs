const GLOBAL_ENV = {
  production: {
    BACKEND_URL: "https://fm3ylhigv7.execute-api.us-east-1.amazonaws.com/dev/",
    FRONTEND_URL: "https://next-sound-fe-web.vercel.app/",
  },
  development: {
    BACKEND_URL: "http://localhost:5024",
    FRONTEND_URL: "http://localhost:3000",
  },
}[process.env.NODE_ENV || "development"]!;

export default GLOBAL_ENV;