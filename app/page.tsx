import Image from "next/image";
import styles from "./page.module.css";
import LandingPage from "./ui/landing-page";
import { SessionProvider } from "next-auth/react"
import { auth } from "../auth"

export default async function Home() {
  const session = await auth()
  return (
    <main>
      <LandingPage />

    </main>
  );
}
