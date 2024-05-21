import Dashboard from "@/app/ui/dashboard/dashboard";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/app/translation-provider";
import { AuthRequiredError } from "@/app/lib/exceptions";
import { auth } from "@/auth";

const i18nNamespaces = ["dashboard"];

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
    const { t, resources } = await initTranslations(locale, i18nNamespaces);
    const session = await auth();

    // if not session
    if (!session || session!.user) {
        throw new AuthRequiredError();
    }

    return (
        <TranslationsProvider
            namespaces={i18nNamespaces}
            locale={locale}
            resources={resources}>
            <Dashboard />
        </TranslationsProvider>
    )
}

