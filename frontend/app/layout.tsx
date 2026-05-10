import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { TrendingUp, Wand2, LayoutDashboard, Wallet } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lumina Market | AI LP Strategist Marketplace",
  description: "Don't just provide liquidity, trade the intelligence.",
};

function NavLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
    >
      {icon}
      {label}
    </Link>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300`}
      >
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <Link
                  href="/marketplace"
                  className="flex items-center gap-2 group"
                >
                  <div className="p-2 bg-blue-600 rounded-lg text-white group-hover:rotate-12 transition-transform">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                    Lumina <span className="text-blue-600">Market</span>
                  </span>
                </Link>
              </div>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center gap-1">
                <NavLink
                  href="/marketplace"
                  icon={<TrendingUp className="w-4 h-4" />}
                  label="Marketplace"
                />
                <NavLink
                  href="/builder"
                  icon={<Wand2 className="w-4 h-4" />}
                  label="Strategist Builder"
                />
                <NavLink
                  href="/dashboard"
                  icon={<LayoutDashboard className="w-4 h-4" />}
                  label="Investor Hub"
                />
              </div>

              {/* Right Action */}
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-blue-600 text-white text-sm font-bold hover:opacity-90 transition-opacity active:scale-95">
                  <Wallet className="w-4 h-4" />
                  <span>Connect Wallet</span>
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="relative">{children}</main>

        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 opacity-60">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">
                © 2024 Lumina Market. Powered by LP Agent.
              </span>
            </div>
            <div className="flex items-center gap-6 text-xs font-medium text-slate-500">
              <Link href="#" className="hover:text-blue-600 transition-colors">
                Documentation
              </Link>
              <Link href="#" className="hover:text-blue-600 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-blue-600 transition-colors">
                Twitter (X)
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
