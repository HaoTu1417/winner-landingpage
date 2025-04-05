import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import LanguageSelector from "@/app/ui/components/LanguageSelector";
import { logout } from "@/store/features/authSlice";
import eventBus, { EventType } from "@/utils/eventBus";
import toast from "react-hot-toast";
import ConfirmModal from "./common/ConfirmModal";
import Button from "./common/Button";

const headerStyle = {
  fontWeight: 500,
  fontSize: "16px",
  lineHeight: "22.4px",
  letterSpacing: "2%",
  color: "#403D3D",
};

const commonClasses =
  "mx-2 transition-all duration-300 hover:underline hover:text-[#0D169E]";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/news", label: "Tin tức" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const pathname = usePathname();
  const { isAuth } = useAppSelector((state) => state.auth);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        setShowConfirm(false);
        eventBus.emit(EventType.UNAUTHORIZED);
        toast.success("Đăng xuất thành công");
      });
  };

  return (
    <header style={{ ...headerStyle }} className="text-blue bg-white">
      <div className="mx-auto flex items-center justify-between px-4 py-3">
        {/* Menu Toggle (Mobile) */}
        <button
          className="block text-3xl lg:hidden"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          ☰
        </button>

        {/* Logo */}
        <Link href="/">
          <div className="h-20 text-lg font-bold">
            <img
              src="/images/LogoWFS.png"
              className="mr-2 h-full object-contain"
              alt="Logo"
            />
          </div>
        </Link>

        {/* Navigation Links */}
        <div
          className="hidden flex-1 flex-row justify-center lg:flex"
          id="NavigationLink"
        >
          {navLinks.map((link, index) => {
            // For special link(s), add extra classes and inline styles conditionally
            const isSpecial = pathname === link.href;
            return (
              <Link
                key={index}
                href={link.href}
                className={`${commonClasses} ${
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

        <div className="flex items-center gap-4">
          <LanguageSelector />

          {isAuth ? (
            <Button
              onClick={() => setShowConfirm(true)}
              className="flex w-fit justify-center rounded-md border border-transparent bg-red-500 px-4 py-3 text-white shadow-sm hover:bg-red-500/90 focus:outline-none"
            >
              Đăng xuất
            </Button>
          ) : (
            <Link href={"auth/login"}>
              <Button className="flex w-fit justify-center rounded-md border border-transparent bg-[#0e15a2] px-4 py-3 text-white shadow-sm hover:bg-[#0e15a2]/90 focus:outline-none">
                Đăng nhập
              </Button>
            </Link>
          )}
        </div>
      </div>

      {menuOpen && (
        <nav className="absolute left-0 top-[100px] z-10 w-full bg-black text-white lg:hidden">
          <div className="flex flex-col space-y-2 p-4">
            {navLinks.map((link) => (
              <Link key={link.href} className="block py-2" href={link.href}>
                {link.label.toUpperCase()}
              </Link>
            ))}
          </div>
        </nav>
      )}

      <ConfirmModal
        isOpen={showConfirm}
        title="Xác nhận"
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleLogout}
      >
        <p className="text-center text-gray-500">Bạn có muốn đăng xuất?</p>
      </ConfirmModal>
    </header>
  );
}
