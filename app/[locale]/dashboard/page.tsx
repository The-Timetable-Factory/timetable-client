import Dashboard from "@/app/ui/dashboard/dashboard";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/app/translation-provider";
import { AuthRequiredError } from "@/app/lib/exceptions";
import { createClient } from "@/utils/supabase/server";

const i18nNamespaces = ["dashboard"];

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
    const { t, resources } = await initTranslations(locale, i18nNamespaces);
    const supabase = createClient();

    const { data: { user }, } = await supabase.auth.getUser();

    if (!user) {
        throw new AuthRequiredError();
    }


    return (
        <TranslationsProvider
            namespaces={i18nNamespaces}
            locale={locale}
            resources={resources}>
            <Dashboard user={user} />
            {/* <p>Hello {JSON.stringify(user)}</p> */}
        </TranslationsProvider>
    )
}

