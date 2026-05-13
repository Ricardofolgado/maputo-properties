"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MP</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Maputo Properties
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/listings"
              className="text-gray-600 hover:text-primary transition-colors font-medium"
            >
              Imóveis
            </Link>
            <Link
              href="/cadastrar"
              className="bg-primary text-white px-5 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              Listar Imóvel
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              href="/listings"
              className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Imóveis
            </Link>
            <Link
              href="/cadastrar"
              className="block px-3 py-2 rounded-lg bg-primary text-white text-center font-medium"
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
