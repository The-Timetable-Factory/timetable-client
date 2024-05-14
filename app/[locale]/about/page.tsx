import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/app/translation-provider";

const i18nNamespaces = ["common"];

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
    const { t, resources } = await initTranslations(locale, i18nNamespaces);
    return (
        <>
            <TranslationsProvider
                namespaces={i18nNamespaces}
                locale={locale}
                resources={resources}>

                <h1>About</h1>
            </TranslationsProvider>
        </>
    )
}