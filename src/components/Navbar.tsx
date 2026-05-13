"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Logo from "./Logo";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <Logo size="sm" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/listings"
              className={`relative text-sm font-medium transition-colors after:absolute after:bottom-[-2px] after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full ${
                scrolled ? "text-gray-700 hover:text-primary" : "text-white/90 hover:text-white"
              }`}
            >
              Imóveis
            </Link>
            <Link
              href="/cadastrar"
              className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-dark transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-95"
            >
              Listar Imóvel
            </Link>
          </div>

          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? "hover:bg-gray-100 text-gray-700" : "hover:bg-white/10 text-white"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-lg border border-gray-100 animate-fade-in">
            <Link
              href="/listings"
              className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-primary-light hover:text-primary font-medium transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Imóveis
            </Link>
            <Link
              href="/cadastrar"
              className="block px-4 py-3 rounded-xl bg-primary text-white text-center font-semibold hover:bg-primary-dark transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Listar Imóvel
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
