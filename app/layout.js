import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  verification: {
    google: "AdEwK1739HrQYD5gSPwz5EXmoxQLTTfJ2ZeVXJwiYwM",
  },
  title: "CodersYap",
  description:
    "A blog uncovering nerd rants from a not-so-quiet mind — tech, creativity, and chaos.",
  keywords: [
    "programming blog",
    "blog",
    "coding",
    "nerd rants",
    "software development",
    "frontend engineering",
    "fullstack tutorials",
    "developer thoughts",
    "CodersYap",
    "codersyap",
    "Codersyap",
    "Purwao",
  ],
  authors: [{ name: "Purwao", url: "https://codersyap.vercel.app" }],
  creator: "Purwao",
  metadataBase: new URL("https://codersyap.vercel.app"),

  openGraph: {
    title: "CodersYap",
    description: "Where thoughts on code, creativity, and chaos meet.",
    url: "https://codersyap.vercel.app",
    siteName: "CodersYap",
    images: [
      {
        url: "https://codersyap.vercel.app/codersyap.webp",
        width: 1200,
        height: 630,
        alt: "CodersYap Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "CodersYap",
    description: "Nerd rants from a not-so-quiet mind.",
    images: ["https://codersyap.vercel.app/codersyap.webp"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },

  icons: {
    icon: "/codersyap.ico", // favicon must be placed in /public
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
