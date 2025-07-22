import type { Metadata } from "next";
import "@/styles/_base.scss";
import Background from "@/components/Background/Background";
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
          <Background />
          {children}
        </Providers>
      </body>
    </html>
  );
}
