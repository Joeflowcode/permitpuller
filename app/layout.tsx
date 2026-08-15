import type { Metadata } from "next";
import { Newsreader, Public_Sans } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://salem-permit-list.netlify.app"),
  title: "Salem Permit List | New remodel and demo permits every Monday",
  description:
    "Address. What they pulled. Who applied. Weekly Salem building permits for flooring, HVAC, fence, paint, landscape, and windows. First week free.",
  openGraph: {
    title: "Salem Permit List",
    description: "New Salem remodel and demo permits, every Monday. First week free.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${newsreader.variable} ${publicSans.variable}`}>
      <body
        style={{
          fontFamily: "var(--font-sans), system-ui, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
