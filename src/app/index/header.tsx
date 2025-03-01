
'use client'
import React, { useState } from "react";
import LanguageSelector from "../ui/components/LanguageSelector";
import { usePathname } from "next/navigation";
const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    // Common classes for all links
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


  // Define an array of navigation items
  const navLinks = [
    { href: "/", label: "Trang chủ", extraClass: "inter",  },
    { href: "/news", label: "Tin tức" },
    { href: "/service", label: "Dịch vụ" },
    { href: "/tttt", label: "Tư vấn trực tuyến" },
    { href: "/analyst", label: "Trung tâm phân tích" },
    { href: "/future", label: "Phái sinh" },
    {
      href: "/about",
      label: "Về WFS",
      // Mark this as special so we can conditionally change its style based on the pathname
      
    },
  ];
  return (
    <><header style={headerStyle} className="bg-white text-blue">
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

  {/* Mobile Menu */}
  {menuOpen && (
    <nav className="top-full left-0 bg-black text-white w-full lg:hidden">
      <div className="flex flex-col space-y-2 p-4">
        <a href="#" className="block py-2">
          TIN TỨC
        </a>
        <a href="#" className="block py-2">
          SẢN PHẨM DỊCH VỤ
        </a>
        <a href="#" className="block py-2">
          TƯ VẤN TRỰC TUYẾN
        </a>
        <a href="#" className="block py-2">
          TRUNG TÂM PHÂN TÍCH
        </a>
        <a href="#" className="block py-2">
          PHÁI SINH
        </a>
        <a href="#" className="block py-2">
          VỀ AGR
        </a>
      </div>
    </nav>
  )}
    </>
  );
};

export default Header;
