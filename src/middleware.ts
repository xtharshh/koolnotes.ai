import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      const path = req.nextUrl.pathname
      
      // Public routes
      if (path === "/" || path === "#select-college-section" || path.startsWith("/auth")) {
        return true
      }
      
      // Protected routes require authentication
      return !!token
    },
  },
})

export const config = {
  matcher: [
    "/upload/:path*",
    "/my-notes/:path*",
    "/dashboard/:path*",
  ],
}
