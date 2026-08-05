import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/footer/page";
import Header from "./components/header/page";
import ScrollToTop from "./components/scrolltotop";
import DisableCopy from "./components/DisableCopy";

export const metadata: Metadata = {
  title: "TITO IT Solutions | Chennai",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <DisableCopy />
        <Header />
        <main>{children}</main>
        <Footer />
         <ScrollToTop />
      </body>
    </html>
  );
}
