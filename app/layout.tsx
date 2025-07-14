import type { Metadata } from "next";
import "@/styles/_base.scss";
import Background from "@/components/Background/Background";
import Navbar from "@/components/common/Navbar";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Synonyms Search Tool",
  description: "Synonym Finder Tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar />
          <Background />
          {children}
        </Providers>
      </body>
    </html>
  );
}
