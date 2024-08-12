import { Inter } from "next/font/google";
import { CartProvider } from './_componet/CartContext'; 
import { Analytics } from "@vercel/analytics/react" 
const inter = Inter({ subsets: ["latin"] });
import MyFooter from './_componet/MyFooter'

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
        <MyFooter/>
      </body>
    </html>
  );
}
