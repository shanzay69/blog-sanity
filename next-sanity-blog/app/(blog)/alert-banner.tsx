"use client"

import { useState } from "react";
import Link from "next/link";

export default function AlertBanner() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="fixed top-0 left-0 z-50 w-full bg-slate-600 text-white backdrop-blur flex justify-between items-center px-7 py-4 border-b border-white">
      {/* Blog logo and heading */}
      <div className="flex items-center space-x-2 text-center text-2xl font-semibold text-white hover:text-cyan-500">
        {/* Car logo */}
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/008/296/135/small_2x/sports-car-icon-isolated-on-white-background-free-vector.jpg" // Replace with your car logo URL
          alt="Car Logo"
          className="h-11 w-12 rounded-full"
        />
        <span>Cars Blogs</span>
      </div>

      {/* Navbar links */}
      <nav
        className={`lg:flex space-x-8 text-sm font-semibold lg:text-base ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <Link href="/" className="text-white hover:text-cyan-500">
            Home
          </Link>
          <Link href="/about" className="text-white hover:text-cyan-500">
            About
          </Link>
          <Link href="/contact" className="text-white hover:text-cyan-500">
            Contact
          </Link>
        </div>
      </nav>

      {/* Mobile Navbar Toggle */}
      <div className="lg:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white hover:text-cyan-600">
          ☰
        </button>
      </div>
    </div>
  );
}
      
