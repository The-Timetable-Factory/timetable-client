// Supabase Auth Middleware

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

// Auth Import

import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
} from "@/routes"

// Internationalization import
import { i18nRouter } from 'next-i18n-router'
import i18nConfig from './i18nConfig';
import { NextRequest, NextResponse } from 'next/server';


export async function supabaseMiddleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    const { data: { session } } = await supabase.auth.getSession();

    console.log(session)

    if (session) {
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT))
    }

    return res;

}


export function middleware(request: NextRequest) {
    return i18nRouter(request, i18nConfig);
}

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}