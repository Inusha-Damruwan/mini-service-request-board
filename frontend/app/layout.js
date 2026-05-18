import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import Header from "../components/Header";
import { Geist, Inter, Poppins } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata = {
  title: "Mini Service Request Board",
  description: "Premium SaaS-style service request management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} ${geist.variable} bg-slate-950 text-slate-100 antialiased`}
      >
        <AuthProvider>
          <ProtectedRoute>
            <Header />
            {children}
          </ProtectedRoute>
        </AuthProvider>
      </body>
    </html>
  );
}