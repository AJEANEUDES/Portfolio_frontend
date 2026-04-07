import type { Metadata } from "next";
import "./globals.css";
import PageTracker from "@/components/layout/PageTracker";


export const metadata: Metadata = {
  title: "Yao Jean-Eudes Adjanohoun | Développeur Fullstack & Chercheur en informatique",
  description: "Développeur & Chercheur Fullstack  en informatique — Vision par ordinateur, Machine Learning, Développement logiciel",
  openGraph: {
    title: "Yao Jean-Eudes Adjanohoun | Développeur Fullstack & Chercheur en informatique",
    description: "Développeur Fullstack & Chercheur en informatique",
    type: "website",
  },

  // icons: {
  //   icon: [
  //       { url: '/avatar_logo.png', sizes: '32x32', type: 'image/png' },
  //       { url: '/avatar_logo.png', sizes: '16x16', type: 'image/png' },
  //     ],
  //     apple: '/avatar_logo.png',
  // },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}