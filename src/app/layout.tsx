import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/footer/page";

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
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
