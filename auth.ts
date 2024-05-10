import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import {
    registerUser,
    credentialsSignInUser,
    checkEmailRegistered,
    OAuthSignInUser,
    OAuthRegisterUser
} from "./app/lib/data/server";


const credentialsConfig = CredentialsProvider({
    name: "credentials",
    credentials: {
        username: { label: "Username", type: "string" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        action: { label: "Action" }
    },
    async authorize(credentials) {
        console.log('credentials: ', credentials)

        if (credentials.action === "signup" && typeof credentials.username === "string" && typeof credentials.email === "string" && typeof credentials.password === "string") {
            // Register user
            console.log("Registering user from auth.ts")
            const { username, email, accessToken } = await registerUser(credentials.username, credentials.email, credentials.password)
            return { id: "1", name: username, email: email, accessToken: accessToken }
        }


        if (credentials.action === "signin" && typeof credentials.email === "string" && typeof credentials.password === "string") {
            // Sign in user
            console.log('Signing in user from auth.ts')
            const { username, email, accessToken } = await credentialsSignInUser(credentials.email, credentials.password)

            return { id: '1', name: username, email: email, accessToken: accessToken }
        }

        return { error: "An error occured. Please try again." } // TODO: change it to throwing an error
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
        async signIn({ user, account, profile }) {
            const provider = account!.provider as string
            const email = user.email as string
            const emailRegistered = await checkEmailRegistered(email)

            if (provider !== "credentials" && !emailRegistered) {
                // Please enter a username before continuing
                const { token } = await OAuthRegisterUser(provider, email)
                user.isNew = true
                user.accessToken = token
                console.log("User Access Token: ", user.accessToken)
                return true
            }

            if (provider !== "credentials" && emailRegistered) {
                const { username, token } = await OAuthSignInUser(provider.toUpperCase(), email)
                user.name = username
                user.accessToken = token
                return true
            }

            return true

        },
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken
                token.isNew = user.isNew

                console.log("Token Access Token: ", token.accessToken)
            }
            return token
        },
        async session({ session, token }) {

            //How to add username?
            session.user.accessToken = token.accessToken as string
            session.user.isNew = token.isNew as boolean

            console.log("Session Access Token: ", session.user.accessToken)

            return session
        },

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







// async authorized({ auth, request: { nextUrl } }) {
//     const { pathname } = nextUrl
//     if (pathname === "/middleware-example") return !!auth

//     const isLoggedIn = !!auth?.user // !! converts to boolean
//     if (isLoggedIn) {
//         const email = auth?.user?.email
//         // check if email registered

//         if (email) {
//             const emailRegistered = await checkEmailRegistered(email)

//             if (emailRegistered) {



//             } else {

//             }
//         }






//         return true
//     }
//     else {
//         return false
//     }
//     // console.log(auth)
//     // console.log(nextUrl)
// },













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