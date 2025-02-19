import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.scss";
//Vamos importar a nossa biblioteca para emissão de alerta
import { Toaster } from "sonner";

const inter = Inter({subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema de gestão de pizzaria",
  description: "O melhor sistema para gerenciar sua pizzaria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster 
          position="top-right"
          toastOptions={
            {
              style:{
                backgroundColor: "#f1f1f1",
                color: "#131313",
                borderColor: "rgba(255,255,255,0.5)"
              }
            }
          }
        />
        {children}
      </body>
    </html>
  );
}
