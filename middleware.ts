import { auth } from "./auth"
import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
} from "@/routes"

export default auth((req): any => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return null;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT))
        }
        return null;
    }

})

// export default auth((req) => {
//     // req.auth
//     // const isLoggedIn = !!req.auth;
//     // console.log("isLoggedIn: " + isLoggedIn)
//     // console.log("Route" + req.nextUrl.pathname)


//     const { nextUrl } = req;
//     const isLoggedIn = !!req.auth;

//     const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
//     const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
//     const isAuthRoute = authRoutes.includes(nextUrl.pathname);


//     if (isApiAuthRoute) {
//         return null;
//     }


// })

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}