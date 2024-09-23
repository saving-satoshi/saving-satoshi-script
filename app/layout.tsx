import type { Metadata } from "next";
import "styles/globals.css";
import Fonts from "./fonts/Fonts";

export const metadata: Metadata = {
  title: "Saving Satoshi Script",
  description: "Saving Satoshi script editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Fonts />
        {children}
      </body>
    </html>
  );
}
