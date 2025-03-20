"use client"
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
    const navLinks = [ { href: "/", label: "Trang chủ", extraClass: "inter",  },
      { href: "/news", label: "Tin tức" },
      ];

  return (
    <header
        style={{ ...headerStyle, ...interFont }}
        className="bg-white text-blue"
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Menu Toggle (Mobile) */}
          <button
            className="block lg:hidden"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            ☰
          </button>

          {/* Logo */}
          <div className="text-lg font-bold h-20">
            <img
              src="/images/LogoWFS.png"
              className="object-contain h-full mr-2"
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
