import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Comunidade Católica Ágape",
  description: "Site oficial da Comunidade Católica Ágape",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="flex flex-col min-h-screen">

        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}