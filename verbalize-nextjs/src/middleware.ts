import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/"]);

// Create the Clerk middleware handler
const clerkHandler = clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Completely bypass Clerk for chatbot routes
  if (pathname.startsWith("/chatbot")) {
    console.log("[Middleware] Bypassing Clerk for chatbot route:", pathname);
    return NextResponse.next();
  }

  // Use Clerk middleware for all other routes
  console.log("[Middleware] Using Clerk for route:", pathname);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return clerkHandler(request, {} as any);
}

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
