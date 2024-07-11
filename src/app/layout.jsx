import { Inter } from "next/font/google";
// import "./globals.css";

const inter = Inter({ subsets: ["latin"] });


// export const metadata = {
//   icons: {
//     icon: "/public/icon.png",
//   },
// };


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <link rel="icon" href="/icon.png"/> */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}
