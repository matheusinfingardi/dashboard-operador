import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils"
import { Sidebar } from "@/components/sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dashboard Drone Delivery - Operator",
  description: "Dashboard to manage and operate drone fleet for Drone as a Service - Drone Delivery Package",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <Sidebar/>
        <main className="flex-1 p-4 sm:ml-20"> 
            {children}
        </main>
      </body>
    </html>
  );
}

