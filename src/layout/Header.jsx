// src/layout/Header.jsx
import { useEffect, useMemo, useState } from "react";
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
  ChevronDown,
} from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, fetchCategoriesIfNeeded } from "../store/actions/thunkActions";

const navBaseMobile =
  "text-[30px] leading-[45px] tracking-[0.2px] text-[#737373]";
const navBaseDesktop =
  "text-[14px] leading-[24px] tracking-[0.2px] text-[#737373]";
const navActive = "text-[#252B42]";

const slugifyTr = (text = "") =>
  String(text)
    .toLowerCase()
    .trim()
    .replaceAll("ç", "c")
    .replaceAll("ğ", "g")
    .replaceAll("ı", "i")
    .replaceAll("ö", "o")
    .replaceAll("ş", "s")
    .replaceAll("ü", "u")
    .replace(/\s+/g, "-");

const genderToPath = (g) => (g === "k" ? "kadin" : g === "e" ? "erkek" : "unisex");

// code alanından categoryName üretelim (k:ayakkabi vs)
// code yoksa title’dan üretelim
const getCategorySlug = (c) => {
  const fromCode = c?.code?.includes(":") ? c.code.split(":")[1] : "";
  return slugifyTr(fromCode || c?.title || "");
};

export default function Header() {
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector((s) => s?.client?.user || {});
  const isLoggedIn = Boolean(user?.email);

  const categories = useSelector((s) => s?.product?.categories || []);

  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  const navClass = (base) => ({ isActive }) =>
    `${base} ${isActive ? navActive : ""}`;

  useEffect(() => {
    dispatch(fetchCategoriesIfNeeded());
  }, [dispatch]);

  const { women, men, promoImg } = useMemo(() => {
    const womenList = categories.filter((c) => c.gender === "k");
    const menList = categories.filter((c) => c.gender === "e");

    // sağdaki görsel için: rating'i en yüksek olanı seçelim (yoksa ilk kadın kategorisi)
    const best =
      [...categories].sort((a, b) => (b?.rating || 0) - (a?.rating || 0))[0] || null;

    return {
      women: womenList,
      men: menList,
      promoImg: best?.img || womenList[0]?.img || menList[0]?.img || "",
    };
  }, [categories]);

  const categoryLink = (c) =>
    `/shop/${genderToPath(c.gender)}/${getCategorySlug(c)}/${c.id}`;

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
            {/* HOME (Team dropdown) */}
            <div className="relative group">
              <NavLink to="/" onClick={closeMenu} className={navClass(navBaseDesktop)}>
                Home
              </NavLink>

              <div className="hidden group-hover:block absolute left-0 top-full h-2 w-full" />

              <div className="hidden group-hover:flex absolute left-0 top-full flex-col bg-white border border-[#E6E6E6] rounded-[6px] py-2 min-w-[200px] z-50">
                <NavLink
                  to="/team"
                  onClick={(e) => {
                    closeMenu();
                    e.currentTarget.blur();
                  }}
                  className="px-4 py-2 text-[14px] leading-[24px] tracking-[0.2px] text-[#737373] hover:text-[#252B42] hover:bg-[#FAFAFA]"
                >
                  Team
                </NavLink>
              </div>
            </div>

            {/* SHOP (MEGA DROPDOWN) */}
            <div className="relative group">
              <NavLink
                to="/shop"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `${navBaseDesktop} ${isActive ? navActive : ""} flex items-center gap-1`
                }
              >
                Shop
                <ChevronDown className="w-4 h-4" />
              </NavLink>

              {/* hover bridge */}
              <div className="hidden group-hover:block absolute left-0 top-full h-2 w-full" />

              {/* Mega dropdown */}
              <div className="hidden group-hover:block absolute left-1/2 -translate-x-1/2 top-full z-50">
                <div className="mt-2 w-[720px] bg-white border border-[#E6E6E6] rounded-[6px] shadow-sm overflow-hidden">
                  <div className="grid grid-cols-3">
                    {/* Women */}
                    <div className="p-6">
                      <div className="font-bold text-[16px] text-[#252B42] mb-3">Kadın</div>
                      <div className="flex flex-col">
                        {women.map((c) => (
                          <NavLink
                            key={c.id}
                            to={categoryLink(c)}
                            onClick={(e) => {
                              closeMenu();
                              e.currentTarget.blur();
                            }}
                            className="py-2 text-[14px] text-[#737373] hover:text-[#252B42]"
                          >
                            {c.title}
                          </NavLink>
                        ))}
                        {women.length === 0 && (
                          <div className="text-[14px] text-[#BDBDBD] py-2">
                            (Kategori yok)
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Men */}
                    <div className="p-6 border-l border-[#E6E6E6]">
                      <div className="font-bold text-[16px] text-[#252B42] mb-3">Erkek</div>
                      <div className="flex flex-col">
                        {men.map((c) => (
                          <NavLink
                            key={c.id}
                            to={categoryLink(c)}
                            onClick={(e) => {
                              closeMenu();
                              e.currentTarget.blur();
                            }}
                            className="py-2 text-[14px] text-[#737373] hover:text-[#252B42]"
                          >
                            {c.title}
                          </NavLink>
                        ))}
                        {men.length === 0 && (
                          <div className="text-[14px] text-[#BDBDBD] py-2">
                            (Kategori yok)
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Promo image */}
                    <div className="relative border-l border-[#E6E6E6]">
                      {promoImg ? (
                        <img
                          src={promoImg}
                          alt="category promo"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#FAFAFA]" />
                      )}
                      <div className="absolute inset-0 bg-black/10" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="text-white font-bold text-[16px] leading-[24px]">
                          New Collection
                        </div>
                        <Link
                          to="/shop"
                          className="inline-flex mt-2 text-[14px] font-bold text-white underline underline-offset-4"
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
            {/* Desktop: user area */}
            {isLoggedIn ? (
              <div className="hidden md:flex items-center gap-3 text-[14px] text-[#252B42]">
                {user?.gravatarUrl ? (
                  <img
                    src={user.gravatarUrl}
                    alt="avatar"
                    className="w-8 h-8 rounded-full border border-[#E6E6E6]"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#E6E6E6]" />
                )}

                <span className="font-bold">{user?.name || user?.email}</span>

                <button
                  type="button"
                  onClick={() => dispatch(logoutUser())}
                  className="text-[#23A6F0] font-bold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2 text-[14px] leading-[24px] tracking-[0.2px] text-[#23A6F0]">
                <Settings className="w-4 h-4" />
                <Link
                  to="/login"
                  state={{ from: location }}
                  className="font-bold hover:underline underline-offset-4"
                >
                  Login
                </Link>
                <span>/</span>
                <Link
                  to="/signup"
                  state={{ from: location }}
                  className="font-bold hover:underline underline-offset-4"
                >
                  Register
                </Link>
              </div>
            )}

            <button className="p-1" aria-label="Search">
              <Search className="w-5 h-5 text-[#23A6F0]" />
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

          <NavLink to="/team" onClick={closeMenu} className={navClass(navBaseMobile)}>
            Team
          </NavLink>

          <NavLink to="/contact" onClick={closeMenu} className={navClass(navBaseMobile)}>
            Contact
          </NavLink>

          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                state={{ from: location }}
                onClick={closeMenu}
                className={navBaseMobile}
              >
                Login
              </Link>
              <Link
                to="/signup"
                state={{ from: location }}
                onClick={closeMenu}
                className={navBaseMobile}
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3">
              {!!user?.gravatarUrl && (
                <img
                  src={user.gravatarUrl}
                  alt="User avatar"
                  className="w-10 h-10 rounded-full"
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="text-[18px] text-[#252B42] font-bold">
                {user?.name || user?.email}
              </div>
              <button
                type="button"
                onClick={() => {
                  dispatch(logoutUser());
                  closeMenu();
                }}
                className="text-[#23A6F0] font-bold text-[18px]"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      )}
    </header>
  );
}
