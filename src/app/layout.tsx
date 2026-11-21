import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "A Little Sorry, Lisha 💛 | From The Bottom of My Heart",
  description: "Hey Lisha! 🥺 I think I owe you a little apology. An interactive letter from me to you.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💌</text></svg>",
  },
  openGraph: {
    title: "A Little Sorry, Lisha 💛",
    description: "Hey Lisha! 🥺 I think I owe you a little apology.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable}`}>
      <body className="antialiased font-sans bg-[#fff8f9] text-[#4a2839] selection:bg-pink-200 min-h-screen">
        {children}
      </body>
    </html>
  );
}
