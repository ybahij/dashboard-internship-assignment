// src/middleware.ts
import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  // Public routes accessible to everyone
  publicRoutes: ['/', '/sign-in(.*)', '/sign-up(.*)', '/api(.*)', '/agencies'],
  // Routes that require authentication (like your contacts page)
  ignoredRoutes: ['/((?!api|trpc|_next|static|favicon.ico).*)'], 
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
