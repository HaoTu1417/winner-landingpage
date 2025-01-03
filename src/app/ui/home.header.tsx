import React, { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  return (
    <header className="bg-black text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Menu Toggle (Mobile) */}
        <button
          className="block lg:hidden"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          ☰
        </button>

        {/* Desktop Right Buttons */}
        <div className="lg:flex space-x-4">
          <button className="bg-green-600 px-4 py-2 rounded">
            Mở Tài Khoản
          </button>
          <button className="bg-green-600 px-4 py-2 rounded">
            Giao Dịch Trực Tuyến
          </button>
        </div>
        {/* Logo */}
        <div className="text-lg font-bold">AGRIBANK</div>
      </div>
    </header>
  );
};

export default Header;
