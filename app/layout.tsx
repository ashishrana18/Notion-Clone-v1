import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { HeartOff } from "lucide-react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {Toaster} from "sonner";
import "./globals.css"
import { EdgeStoreProvider } from "@/lib/edgestore";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notion",
  description: "A connected workspace where better, faster work happens.",
  icons: {
    icon: "/notion.png",  // This is the correct way to reference an icon
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/not.png" type="image/png" />
      </head>
      <body className={inter.className}>
      <ConvexClientProvider>
        <EdgeStoreProvider>
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="Notion-theme"
            >
              <Toaster position="bottom-center"/>
              {children}
              <ModalProvider/>
          </ThemeProvider>
        </EdgeStoreProvider>
      </ConvexClientProvider>
      </body>
    </html>
  );
}
