import type { Metadata } from "next";
import { Oswald, Nunito, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { ShaderBackground } from "@/components/effects/ShaderBackground";
import { SmoothScroll } from "@/components/effects/SmoothScroll";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["300", "400", "500"],
});

const BASE_URL = "https://lazandev.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Peter Paul Lazan — Full-Stack Developer",
    template: "%s | Peter Paul Lazan",
  },
  description:
    "Peter Paul Lazan is a Full-Stack Developer and Mobile App engineer based in Davao City, Philippines. Specialising in React, Next.js, React Native, TypeScript, and Supabase — building production-ready web apps, SaaS platforms, and mobile apps.",

  keywords: [
    "Peter Paul Lazan",
    "lazandev",
    "Full-Stack Developer Philippines",
    "Full-Stack Developer Davao",
    "React Developer Philippines",
    "Next.js Developer",
    "React Native Developer",
    "TypeScript Developer",
    "Supabase Developer",
    "Mobile App Developer Davao",
    "Freelance Developer Philippines",
    "Web Developer Davao City",
    "SaaS Developer",
    "Node.js Developer",
  ],

  authors: [{ name: "Peter Paul Lazan", url: BASE_URL }],
  creator: "Peter Paul Lazan",
  publisher: "Peter Paul Lazan",

  alternates: {
    canonical: BASE_URL,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Peter Paul Lazan — Portfolio",
    title: "Peter Paul Lazan — Full-Stack Developer",
    description:
      "Full-Stack Developer based in Davao City, Philippines. Building production-ready web apps, SaaS platforms, and mobile apps with React, Next.js, and TypeScript.",
    images: [
      {
        url: "/profile.png",
        width: 600,
        height: 600,
        alt: "Peter Paul Lazan — Full-Stack Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Peter Paul Lazan — Full-Stack Developer",
    description:
      "Full-Stack Developer based in Davao City, Philippines. Building production-ready web apps, SaaS platforms, and mobile apps.",
    images: ["/profile.png"],
    creator: "@fearcleevan",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/profile.png",
    shortcut: "/profile.png",
    apple: "/profile.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Peter Paul Lazan",
    url: BASE_URL,
    image: `${BASE_URL}/profile.png`,
    jobTitle: "Full-Stack Developer",
    description:
      "Full-Stack Developer and Mobile App engineer based in Davao City, Philippines, specialising in React, Next.js, React Native, TypeScript, and Supabase.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Davao City",
      addressCountry: "PH",
    },
    sameAs: [
      "https://github.com/FearCleevan",
      "https://linkedin.com/in/peter-paul-lazan",
      "https://www.instagram.com/fear.cleevan/",
      "https://www.facebook.com/FearCleevan",
    ],
    knowsAbout: [
      "React", "Next.js", "React Native", "TypeScript", "Node.js",
      "Supabase", "PostgreSQL", "Full-Stack Development", "Mobile App Development",
    ],
  };

  return (
    <html
      lang="en"
      className={`${oswald.variable} ${nunito.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* Fullscreen shader — behind everything */}
        <ShaderBackground />

        {/* Fixed left sidebar */}
        <Sidebar />

        {/* Main content pushed right of sidebar */}
        <SmoothScroll>
          <main className="sidebar-push min-h-screen">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
