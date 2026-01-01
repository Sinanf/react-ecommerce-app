// src/layout/Header.jsx
import { useState } from "react";
import {
  Menu,
  Search,
  ShoppingCart,
  Settings,
  Phone,
  Mail,
  Instagram,
  Youtube,
  Facebook,
  Twitter,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const navBaseMobile =
  "text-[30px] leading-[45px] tracking-[0.2px] text-[#737373]";
const navBaseDesktop =
  "text-[14px] leading-[24px] tracking-[0.2px] text-[#737373]";
const navActive = "text-[#252B42]";

export default function Header() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);
  const navClass = (base) => ({ isActive }) =>
    `${base} ${isActive ? navActive : ""}`;

  return (
    <header className="w-full flex flex-col bg-white">
      {/* TOP INFO BAR (desktop) */}
      <div className="hidden md:flex w-full bg-[#23856D] text-white">
        <div className="w-full max-w-6xl mx-auto px-4 h-12 flex flex-row items-center justify-between">
          {/* left */}
          <div className="flex flex-row items-center gap-6 text-[14px] leading-[24px] tracking-[0.2px]">
            <div className="flex flex-row items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>(225) 555-0118</span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>michelle.rivera@example.com</span>
            </div>
          </div>

          {/* center */}
          <div className="text-[14px] leading-[24px] tracking-[0.2px] font-bold">
            Follow Us and get a chance to win 80% off
          </div>

          {/* right */}
          <div className="flex flex-row items-center gap-3 text-[14px] leading-[24px] tracking-[0.2px]">
            <span className="font-bold">Follow Us :</span>
            <Instagram className="w-4 h-4" />
            <Youtube className="w-4 h-4" />
            <Facebook className="w-4 h-4" />
            <Twitter className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="w-full border-b border-[#E6E6E6]">
        <div className="w-full max-w-6xl mx-auto px-4 py-4 flex flex-row items-center justify-between">
          {/* brand */}
          <Link
            to="/"
            className="font-bold text-[24px] leading-[32px] tracking-[0.1px] text-[#252B42]"
            onClick={closeMenu}
          >
            Bandage
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex flex-row items-center gap-6">
            <NavLink to="/" onClick={closeMenu} className={navClass(navBaseDesktop)}>
              Home
            </NavLink>
            <NavLink to="/shop" onClick={closeMenu} className={navClass(navBaseDesktop)}>
              Shop
            </NavLink>
            <NavLink to="/about" onClick={closeMenu} className={navClass(navBaseDesktop)}>
              About
            </NavLink>
            <NavLink to="/blog/1" onClick={closeMenu} className={navClass(navBaseDesktop)}>
              Blog
            </NavLink>
            <NavLink to="/contact" onClick={closeMenu} className={navClass(navBaseDesktop)}>
              Contact
            </NavLink>
          </nav>

          {/* Right side icons */}
          <div className="flex flex-row items-center gap-4">
            {/* desktop: login/register text (placeholder) */}
            <div className="hidden md:flex flex-row items-center gap-2 text-[14px] leading-[24px] tracking-[0.2px] text-[#23A6F0]">
              <Settings className="w-4 h-4" />
              <span className="font-bold">Login / Register</span>
            </div>

            <button className="p-1" aria-label="Search">
              <Search className="w-5 h-5 text-[#23A6F0] md:text-[#23A6F0]" />
            </button>

            <button className="p-1 flex flex-row items-center gap-1" aria-label="Cart">
              <ShoppingCart className="w-5 h-5 text-[#23A6F0]" />
              <span className="hidden md:inline text-[12px] text-[#23A6F0]">1</span>
            </button>

            {/* mobile hamburger */}
            <button
              className="p-1 md:hidden"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
            >
              <Menu className="w-5 h-5 text-[#252B42]" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="w-full flex flex-col items-center justify-center gap-[30px] py-8 md:hidden">
          <NavLink to="/" onClick={closeMenu} className={navClass(navBaseMobile)}>
            Home
          </NavLink>
          <NavLink to="/shop" onClick={closeMenu} className={navClass(navBaseMobile)}>
            Shop
          </NavLink>
          <NavLink to="/about" onClick={closeMenu} className={navClass(navBaseMobile)}>
            About
          </NavLink>
          <NavLink to="/blog/1" onClick={closeMenu} className={navClass(navBaseMobile)}>
            Blog
          </NavLink>
          <NavLink to="/contact" onClick={closeMenu} className={navClass(navBaseMobile)}>
            Contact
          </NavLink>
        </nav>
      )}
    </header>
  );
}
