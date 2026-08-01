import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Skill Swap Platform",
  description: "A premium platform to swap skills with others",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-text-primary antialiased min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
