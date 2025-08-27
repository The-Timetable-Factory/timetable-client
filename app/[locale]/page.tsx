
import LandingPage from "../ui/landing-page";
// import { auth } from "../../auth";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/app/translation-provider";

export const dynamic = 'force-dynamic'; // Force dynamic rendering

const i18nNamespaces = ["landing-page"];

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (

    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}>


      <main>
        {/* <h1>{t("slogan")}</h1> */}
        <LandingPage />


      </main>
    </TranslationsProvider>
  );
}
