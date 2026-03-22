import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ToastProvider";
import { AuthGate } from "@/components/AuthGate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://repodoc-ai.vercel.app"),
  title: "RepoDoc AI — Auto-Generate Code Documentation",
  description:
    "Generate JSDoc, README, API docs, architecture explanations, changelogs, and migration guides from your code.",
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  openGraph: {
    title: "RepoDoc AI — Auto-Generate Code Documentation",
    description:
      "Generate JSDoc, README, API docs, architecture explanations, changelogs, and migration guides from your code.",
    url: "https://repodoc-ai.vercel.app",
    siteName: "RepoDoc AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RepoDoc AI — Auto-Generate Code Documentation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RepoDoc AI — Auto-Generate Code Documentation",
    description:
      "Generate JSDoc, README, API docs, architecture explanations, changelogs, and migration guides from your code.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('repodoc-theme')||'dark';if(t==='system'){t=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','dark')}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "RepoDoc AI",
              url: "https://repodoc-ai.vercel.app",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Web",
              description:
                "Generate JSDoc, README, API docs, architecture explanations, changelogs, and migration guides from your code.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              creator: {
                "@type": "Organization",
                name: "AISurgent.Dev",
                url: "https://aisurgent.dev",
              },
            }),
          }}
        />
      </head>
      <body className="noise-bg min-h-full flex flex-col">
        <AuthGate><ToastProvider>{children}</ToastProvider></AuthGate>
      </body>
    </html>
  );
}
