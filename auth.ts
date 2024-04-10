import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { addUser, signInUser } from "./app/lib/data/server";


const credentialsConfig = CredentialsProvider({
    name: "credentials",
    credentials: {
        username: { label: "Username", type: "string" },
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email" },
        action: { label: "Action" }
    },
    async authorize(credentials) {
        console.log('credentials: ', credentials)

        if (credentials.action === "signup" && typeof credentials.username === "string" && typeof credentials.email === "string" && typeof credentials.password === "string") {
            // Add user to server
            console.log("Adding user")
            addUser(credentials.username, credentials.email, credentials.password)
        }

        if (credentials.email === "test@email.com" && credentials.password === "test1234") {
            return { id: "1", name: "Test User", email: credentials.email };
        } else {
            return null;
        }

        if (credentials.action === "signin" && typeof credentials.email === "string" && typeof credentials.password === "string") {
            // Sign in user
        }
        // if ( typeof credentials.username !== "string" && typeof credentials.email !== "string" && typeof credentials.password !== "string") {
        //     return {error: "An error occured. Please try again."} // Might need to change this to throw an error
        // }
    },
});

const config = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        credentialsConfig
    ],
    pages: {
        signIn: '/signin'
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const { pathname } = nextUrl
            if (pathname === "/middleware-example") return !!auth

            console.log(auth)
            console.log(nextUrl)
            const isLoggedIn = !!auth?.user // !! converts to boolean
            if (isLoggedIn) {
                const email = auth?.user?.email

                return true
            }
            else {
                return false
            }
        }
    },
    session: {
        strategy: 'jwt'
    },
    secret: process.env.AUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',

} satisfies NextAuthConfig


export const { handlers, auth, signIn, signOut } = NextAuth(config)

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