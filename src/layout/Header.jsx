// src/layout/Header.jsx
import { useState } from "react";
import { Menu, Search, ShoppingCart, Settings } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const navBaseMobile = "text-[30px] leading-[45px] tracking-[0.2px] text-[#737373]";
const navBaseDesktop = "text-[14px] leading-[24px] tracking-[0.2px] text-[#737373]";
const navActive = "text-[#252B42]";

export default function Header() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  const navClass = (base) => ({ isActive }) => `${base} ${isActive ? navActive : ""}`;

  return (
    <header className="w-full bg-white flex flex-col">
      {/* Top bar */}
      <div className="w-full flex flex-row items-center justify-between px-4 py-4">
        <Link
          to="/"
          className="font-bold text-[24px] leading-[32px] tracking-[0.1px] text-[#252B42]"
          onClick={closeMenu}
        >
          Bandage
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex md:flex-row md:items-center md:gap-6">
          <NavLink to="/" onClick={closeMenu} className={navClass(navBaseDesktop)}>
            Home
          </NavLink>
          <NavLink to="/shop" onClick={closeMenu} className={navClass(navBaseDesktop)}>
            Product
          </NavLink>
          <NavLink to="/pricing" onClick={closeMenu} className={navClass(navBaseDesktop)}>
            Pricing
          </NavLink>
          <NavLink to="/contact" onClick={closeMenu} className={navClass(navBaseDesktop)}>
            Contact
          </NavLink>
        </nav>

        {/* Icons */}
        <div className="flex flex-row items-center justify-center gap-[25px]">
          <button className="p-1" aria-label="Settings">
            <Settings className="w-5 h-5 text-[#252B42]" />
          </button>
          <button className="p-1" aria-label="Search">
            <Search className="w-5 h-5 text-[#252B42]" />
          </button>
          <button className="p-1" aria-label="Cart">
            <ShoppingCart className="w-5 h-5 text-[#252B42]" />
          </button>

          {/* Mobile hamburger only */}
          <button
            className="p-1 md:hidden"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <Menu className="w-5 h-5 text-[#252B42]" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="w-full flex flex-col items-center justify-center gap-[30px] py-8 md:hidden">
          <NavLink to="/" onClick={closeMenu} className={navClass(navBaseMobile)}>
            Home
          </NavLink>
          <NavLink to="/shop" onClick={closeMenu} className={navClass(navBaseMobile)}>
            Product
          </NavLink>
          <NavLink to="/pricing" onClick={closeMenu} className={navClass(navBaseMobile)}>
            Pricing
          </NavLink>
          <NavLink to="/contact" onClick={closeMenu} className={navClass(navBaseMobile)}>
            Contact
          </NavLink>
        </nav>
      )}
    </header>
  );
}
