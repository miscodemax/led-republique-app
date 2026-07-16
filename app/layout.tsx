import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import InstallPrompt from "./components/InstallPrompt";
import RegisterSW from "./components/Registersw";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SyncOfflineData from "./components/SyncOfflineData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LED République | Le Renouveau de Yoff",
  description: "Site officiel du mouvement citoyen pour le progrès, l'autonomisation et l'engagement républicain à Yoff, porté par El Mansour Dia.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "LED République",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${geistSans.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-200 selection:text-blue-900">
        <Navbar />

        <main className="flex-1 flex flex-col">{children}</main>

        <Footer />

        {/* Invite d'installation PWA */}
        <InstallPrompt />

        {/* Activation du mode hors-ligne (mise en cache de l'app) */}
        <RegisterSW />

        {/* Synchronisation des inscriptions faites hors-ligne, dès que possible */}
        <SyncOfflineData />
      </body>
    </html>
  );
}