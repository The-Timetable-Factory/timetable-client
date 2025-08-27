// 'use client'

// import { GoogleSignIn } from '../ui/sign-in/auth-components';
import { signIn } from 'next-auth/react'

import SignIn from '@/app/ui/sign-in/sign-in';
import SignUp from '@/app/ui/sign-in/sign-up';
import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/app/translation-provider';

const i18nNamespaces = ["signin"];

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
    const { t, resources } = await initTranslations(locale, i18nNamespaces)

    return (
        <>
            <TranslationsProvider
                namespaces={i18nNamespaces}
                locale={locale}
                resources={resources}
            >

                <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', columnGap: '120px', marginLeft: '240px', marginRight: '240px', marginTop: '100px' }}>
                    <SignUp />
                    <SignIn />
                </div>
            </TranslationsProvider>
        </>
    )
}