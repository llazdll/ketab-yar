import { Toaster } from "sonner";
import "./globals.css";
import Navbar from "./Navbar";
import Link from "next/link";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa-IR" dir="rtl" >
      <body>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <main className="mx-auto">{children}</main>
          <Toaster position="top-right" richColors closeButton />
          <footer className="bg-white shadow-lg mt-8">
            <div className="container mx-auto px-4 py-6 flex justify-center">
              <Link href="mailto:mo.ho3.azd@gmail.com" className="text-gray-600 text-xl font-bold flex items-center space-x-2">
                <span dir="ltr">&#169; {new Date().getFullYear()}</span>
                <span>کتاب‌یار. تمامی حقوق محفوظ است.</span>
                <span className="text-background hover:text-primary">``llazdll``</span>
              </Link>
            </div>

          </footer>
        </div>
      </body>
    </html>
  );
}
