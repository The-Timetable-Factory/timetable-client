import Dashboard from "@/app/ui/dashboard/dashboard";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/app/translation-provider";

const i18nNamespaces = ["dashboard"];

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
    const { t, resources } = await initTranslations(locale, i18nNamespaces)


    return (
        <TranslationsProvider
            namespaces={i18nNamespaces}
            locale={locale}
            resources={resources}>
            <Dashboard />
        </TranslationsProvider>
    )
}

