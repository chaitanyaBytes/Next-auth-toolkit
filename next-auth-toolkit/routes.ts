// array of routes accessible to public without authentication
export const publicRoutes = ["/"];

//these routes will redirect logged in users to /settings
export const authRoutes = ["/auth/login", "/auth/register"];


export const apiAuthPrefix = "/api/auth"