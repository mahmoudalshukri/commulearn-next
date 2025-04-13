"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const PublicNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex justify-between items-center bg-white h-[70px] px-4 md:px-16">
      <Image src="/logo.png" alt="logo" width={270} height={70} />

      {/* Desktop and larger screen links */}
      <div className="hidden md:flex gap-4 font-medium text-lg text-[#263B70]">
        <Link href="/about-us">About Us</Link>
        <Link href="/services">Services</Link>
        <Link href="/contact">Contact</Link>
      </div>

      {/* Sign In button */}
      <button className="hidden md:block bg-[#263B70] text-white px-4 py-2 text-lg font-medium rounded-md">
        <Link href="/sign-in">Sign In</Link>
      </button>

      {/* Hamburger menu for mobile */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMobileMenu} className="text-[#263B70] text-2xl">
          {isMobileMenuOpen ? "X" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[70px] left-0 right-0 bg-white shadow-lg p-4">
          <div className="flex flex-col gap-4 text-lg text-[#263B70]">
            <Link href="/about-us">About Us</Link>
            <Link href="/services">Services</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/sign-in">
              <button className="bg-[#263B70] text-white w-full py-2 text-lg font-medium rounded-md">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicNavbar;
