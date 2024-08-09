import { Inter } from "next/font/google";
import { CartProvider } from './_componet/CartContext'; 
import { Analytics } from "@vercel/analytics/react"
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" />
      </head>
      <body className={inter.className}>
        <Analytics />
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
