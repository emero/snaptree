import { ToastContainer } from "react-toastify";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
  weight: ["400", "500"],
  variable: "--font-jakarta",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.className} font-normal`}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
