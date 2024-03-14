import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import type { NextAuthConfig } from 'next-auth';

const config = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            console.log(auth)
            console.log(nextUrl)
            const isLoggedIn = !!auth?.user // !! converts to boolean
            if (isLoggedIn) {
                const email = auth?.user?.email
                // TODO: send email to server
                // Server Action
                // if email is not in the database, add it
                // if email is in the database,
                // 1. update the last login dates
                // 3. update the last login device
                // 6. update the last login OS
                // 7. update the last login device type
                // 8. update the last login device brand
                // 9. update the last login device model
                // 10. update the last login device screen size
                // 12. update the last login device screen orientation 

                return true
            }
            else {
                return false
            }
        }
    }
} satisfies NextAuthConfig


export const { handlers, auth, signIn, signOut } = NextAuth(config)


// Server Action
// if email is not in the database, add it
// if email is in the database,
// 1. update the last login date
// 2. update the last login IP
// 3. update the last login device
// 4. update the last login location
// 5. update the last login browser
// 6. update the last login OS
// 7. update the last login device type
// 8. update the last login device brand
// 9. update the last login device model
// 10. update the last login device screen size
// 11. update the last login device screen resolution
// 12. update the last login device screen orientation




















// import NextAuth from "next-auth"
// import Google from "next-auth/providers/google"
// import type { NextAuthConfig } from "next-auth"


// // export const { handlers, auth } = NextAuth({ providers: [Google] })

// export const config = {
//     providers: [Google],
//     callbacks: {
//         authorized({ request, auth }) {
//             const { pathname } = request.nextUrl
//             if (pathname === "/middleware-example") return !!auth
//             return true
//         },
//     }
// } satisfies NextAuthConfig

// export const { handlers, auth, signIn, signOut } = NextAuth(config)