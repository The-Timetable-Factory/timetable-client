
import TranslationsProvider from "@/app/translation-provider"
import initTranslations from "@/app/i18n"
import Profile from "@/app/ui/profile/profile"

const i18nNamespaces = ["signin"]

export default async function Page({ params: { locale } }: { params: { locale: string } }) {

    // const { data: session, update, status } = useSession()
    const { t, resources } = await initTranslations('en', i18nNamespaces)

    // if (!session || !session.user) {
    //     return <div> Please sign in</div>
    // }

    // console.log('session: ', session)

    return (
        <>
            <TranslationsProvider
                namespaces={i18nNamespaces}
                locale={locale}
                resources={resources}>
                <Profile user={null}/>


            </TranslationsProvider>


        </>
    )
}