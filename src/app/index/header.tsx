"use client";
import React, { useState } from "react";
import Image from "next/image";
import LanguageSelector from "../ui/components/LanguageSelector";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const commonClasses =
    "mx-2 transition-all duration-300 hover:underline hover:text-[#0D169E]";
  const pathname = usePathname();

  const headerStyle = {
    fontFamily: "Inter",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "22.4px",
    letterSpacing: "2%",
    color: "#403D3D",
  };

  const navLinks = [
    { href: "/", label: "Trang chủ", extraClass: "inter" },
    { href: "/news", label: "Tin tức" },
    { href: "/service", label: "Dịch vụ" },
    { href: "/tttt", label: "Tư vấn trực tuyến" },
    { href: "/analyst", label: "Trung tâm phân tích" },
    { href: "/future", label: "Phái sinh" },
    { href: "/about", label: "Về WFS" },
  ];

  return (
    <>
      <header style={headerStyle} className="text-blue bg-white">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <button
            className="block lg:hidden"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            ☰
          </button>

          {/* Logo */}
          <div className="relative h-20 w-40 text-lg font-bold">
            <Image
              src="/images/LogoWFS.png"
              layout="fill"
              objectFit="contain"
              alt="Logo"
            />
          </div>

          {/* Navigation Links */}
          <div className="hidden flex-row lg:flex" id="NavigationLink">
            {navLinks.map((link, index) => {
              const isSpecial = pathname === link.href;
              return (
                <Link
                  key={index}
                  href={link.href}
                  className={`${commonClasses} ${link.extraClass || ""} ${
                    isSpecial ? "underline underline-offset-4" : ""
                  }`}
                  style={
                    isSpecial
                      ? { ...headerStyle, color: "#0D169E", fontWeight: 700 }
                      : headerStyle
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <LanguageSelector />
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="left-0 top-full w-full bg-black text-white lg:hidden">
          <div className="flex flex-col space-y-2 p-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="block py-2">
                {link.label.toUpperCase()}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </>
  );
};

export default Header;
