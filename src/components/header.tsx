"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
// import { useTranslation } from "react-i18next";
import LanguageSelector from "../app/ui/components/LanguageSelector";
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  // const { t } = useTranslation();
  const pathname = usePathname();
  const interFont = {
    fontFamily: "Inter",
  };

  const headerStyle = {
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "22.4px",
    letterSpacing: "2%",
    color: "#403D3D",
  };

  // Common classes for all links
  const commonClasses =
    "mx-2 transition-all duration-300 hover:underline hover:text-[#0D169E]";

  // Define an array of navigation items
  const navLinks = [
    { href: "/", label: "Trang chủ", extraClass: "inter" },
    { href: "/news", label: "Tin tức" },
  ];

  return (
    <header
      style={{ ...headerStyle, ...interFont }}
      className="text-blue bg-white"
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Menu Toggle (Mobile) */}
        <button
          className="block lg:hidden"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          ☰
        </button>

        {/* Logo */}
        <div className="h-20 text-lg font-bold">
          <img
            src="/images/LogoWFS.png"
            className="mr-2 h-full object-contain"
            alt="Logo"
          />
        </div>

        {/* Navigation Links */}
        <div className="hidden flex-row lg:flex" id="NavigationLink">
          {navLinks.map((link, index) => {
            // For special link(s), add extra classes and inline styles conditionally
            const isSpecial = pathname === link.href;
            return (
              <a
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
              </a>
            );
          })}
        </div>

        <LanguageSelector />
      </div>
    </header>
  );
};

export default Header;
