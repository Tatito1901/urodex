// app/layout.tsx
import type { Metadata } from "next"
import type React from "react"
import { Roboto, Roboto_Serif } from "next/font/google"
import "./globals.css"
import Script from "next/script"

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
})

const robotoSerif = Roboto_Serif({
  subsets: ["latin"],
  variable: "--font-roboto-serif",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: {
    default: "Dr. Mario Martínez Thomas | Urólogo Especialista",
    template: "%s | Dr. Mario Martínez Thomas",
  },
  description:
    "Clínica especializada en urología y cirugía de próstata en Ciudad de México. Dr. Mario Martínez Thomas, urólogo certificado con amplia experiencia.",
  applicationName: "Dr. Mario Martínez Thomas",
  authors: [{ name: "Dr. Mario Martínez Thomas", url: "https://drmariomartinez.mx" }],
  keywords: [
    "urólogo",
    "urología",
    "próstata",
    "Ciudad de México",
    "Dr. Mario Martínez Thomas",
    "cirugía prostática",
  ],
  referrer: "origin-when-cross-origin",

  creator: "Dr. Mario Martínez Thomas",
  publisher: "Dr. Mario Martínez Thomas",
  robots: "index, follow",
  metadataBase: new URL("https://drmariomartinez.mx"),
  openGraph: {
    title: "Dr. Mario Martínez Thomas | Urólogo Especialista",
    description:
      "Especialistas en urología avanzada en CDMX. Atención profesional por el Dr. Mario Martínez Thomas.",
    url: "https://drmariomartinez.mx",
    siteName: "Dr. Mario Martínez Thomas",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Mario Martínez Thomas",
    description:
      "Especialista en urología y cirugía de próstata en CDMX.",
    creator: "@drmariomtz",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" dir="ltr" suppressHydrationWarning>
      <head>
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5RVLH8RC');
          `}
        </Script>
      </head>
      <body
        className={`${roboto.variable} ${robotoSerif.variable} font-sans antialiased`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5RVLH8RC"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
