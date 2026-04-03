import Providers from "./Provider";
import { Geist, Geist_Mono } from "next/font/google";
import { Geologica } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

export const headFont = localFont({
  src: [
    {
      path: "../fonts/fraunces/Fraunces-VariableFont_SOFT,WONK,opsz,wght.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/fraunces/Fraunces-VariableFont_SOFT,WONK,opsz,wght.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
});

const geologica = Geologica({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geologica.className} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
