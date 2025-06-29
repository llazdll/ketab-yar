import { Toaster } from "sonner";
import "./globals.css";
import Navbar from "./Navbar";
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
            <div className="container mx-auto px-4 py-6">
              <p className="text-gray-600 text-center">
                © llazdll
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
