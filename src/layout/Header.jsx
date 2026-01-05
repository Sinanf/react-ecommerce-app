// src/layout/Header.jsx
import { useEffect, useMemo, useRef, useState } from "react";
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

const genderToPath = (g) =>
  g === "k" ? "kadin" : g === "e" ? "erkek" : "unisex";

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

  const cart = useSelector((s) => s?.cart?.cart || []);
  const cartCount = cart.reduce((acc, i) => acc + (i.count || 0), 0);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const price = Number(item?.product?.price) || 0;
      const count = Number(item?.count) || 0;
      return sum + price * count;
    }, 0);
  }, [cart]);

  const [cartOpen, setCartOpen] = useState(false);
  const cartWrapRef = useRef(null);

  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  const navClass = (base) => ({ isActive }) =>
    `${base} ${isActive ? navActive : ""}`;

  useEffect(() => {
    dispatch(fetchCategoriesIfNeeded());
  }, [dispatch]);

  // ✅ Dışarı tıklayınca dropdown kapan
  useEffect(() => {
    if (!cartOpen) return;

    const onDown = (e) => {
      const el = cartWrapRef.current;
      if (!el) return;
      if (!el.contains(e.target)) setCartOpen(false);
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [cartOpen]);

  const { women, men, promoImg } = useMemo(() => {
    const womenList = categories.filter((c) => c.gender === "k");
    const menList = categories.filter((c) => c.gender === "e");

    const best =
      [...categories].sort((a, b) => (b?.rating || 0) - (a?.rating || 0))[0] ||
      null;

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

          <div className="text-[14px] leading-[24px] tracking-[0.2px] font-bold">
            Follow Us and get a chance to win 80% off
          </div>

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
          <Link
            to="/"
            className="font-bold text-[24px] leading-[32px] tracking-[0.1px] text-[#252B42]"
            onClick={() => {
              closeMenu();
              setCartOpen(false);
            }}
          >
            Bandage
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex flex-row items-center gap-6">
            {/* HOME */}
            <div className="relative group">
              <NavLink
                to="/"
                onClick={() => {
                  closeMenu();
                  setCartOpen(false);
                }}
                className={navClass(navBaseDesktop)}
              >
                Home
              </NavLink>

              <div className="hidden group-hover:block absolute left-0 top-full h-2 w-full" />

              <div className="hidden group-hover:flex absolute left-0 top-full flex-col bg-white border border-[#E6E6E6] rounded-[6px] py-2 min-w-[200px] z-50">
                <NavLink
                  to="/team"
                  onClick={(e) => {
                    closeMenu();
                    setCartOpen(false);
                    e.currentTarget.blur();
                  }}
                  className="px-4 py-2 text-[14px] leading-[24px] tracking-[0.2px] text-[#737373] hover:text-[#252B42] hover:bg-[#FAFAFA]"
                >
                  Team
                </NavLink>
              </div>
            </div>

            {/* SHOP */}
            <div className="relative group">
              <NavLink
                to="/shop"
                onClick={() => {
                  closeMenu();
                  setCartOpen(false);
                }}
                className={({ isActive }) =>
                  `${navBaseDesktop} ${
                    isActive ? navActive : ""
                  } flex items-center gap-1`
                }
              >
                Shop
                <ChevronDown className="w-4 h-4" />
              </NavLink>

              <div className="hidden group-hover:block absolute left-0 top-full h-2 w-full" />

              <div className="hidden group-hover:block absolute left-1/2 -translate-x-1/2 top-full z-50">
                <div className="mt-2 w-[720px] bg-white border border-[#E6E6E6] rounded-[6px] shadow-sm overflow-hidden">
                  <div className="grid grid-cols-3">
                    <div className="p-6">
                      <div className="font-bold text-[16px] text-[#252B42] mb-3">
                        Kadın
                      </div>
                      <div className="flex flex-col">
                        {women.map((c) => (
                          <NavLink
                            key={c.id}
                            to={categoryLink(c)}
                            onClick={(e) => {
                              closeMenu();
                              setCartOpen(false);
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

                    <div className="p-6 border-l border-[#E6E6E6]">
                      <div className="font-bold text-[16px] text-[#252B42] mb-3">
                        Erkek
                      </div>
                      <div className="flex flex-col">
                        {men.map((c) => (
                          <NavLink
                            key={c.id}
                            to={categoryLink(c)}
                            onClick={(e) => {
                              closeMenu();
                              setCartOpen(false);
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
                          onClick={() => setCartOpen(false)}
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <NavLink
              to="/about"
              onClick={() => {
                closeMenu();
                setCartOpen(false);
              }}
              className={navClass(navBaseDesktop)}
            >
              About
            </NavLink>

            <NavLink
              to="/blog/1"
              onClick={() => {
                closeMenu();
                setCartOpen(false);
              }}
              className={navClass(navBaseDesktop)}
            >
              Blog
            </NavLink>

            <NavLink
              to="/contact"
              onClick={() => {
                closeMenu();
                setCartOpen(false);
              }}
              className={navClass(navBaseDesktop)}
            >
              Contact
            </NavLink>
          </nav>

          <div className="flex flex-row items-center gap-4">
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
                  onClick={() => setCartOpen(false)}
                >
                  Login
                </Link>
                <span>/</span>
                <Link
                  to="/signup"
                  state={{ from: location }}
                  className="font-bold hover:underline underline-offset-4"
                  onClick={() => setCartOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}

            <button className="p-1" aria-label="Search">
              <Search className="w-5 h-5 text-[#23A6F0]" />
            </button>

            {/* ✅ key: route değişince bu subtree remount olur, cartOpen default false */}
            <div className="relative" ref={cartWrapRef} key={location.pathname}>
              <button
                type="button"
                className="p-1 flex flex-row items-center gap-1"
                aria-label="Cart"
                onClick={() => setCartOpen((v) => !v)}
              >
                <ShoppingCart className="w-5 h-5 text-[#23A6F0]" />
                <span className="hidden md:inline text-[12px] text-[#23A6F0] font-bold">
                  {cartCount}
                </span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[11px] leading-[18px] text-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {cartOpen && (
                <div className="absolute right-0 mt-3 w-[320px] bg-white border border-[#E6E6E6] rounded-[10px] shadow-lg z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-[#E6E6E6] flex items-center justify-between">
                    <div className="font-bold text-[#252B42] text-[14px]">
                      Shopping Cart ({cartCount})
                    </div>
                    <button
                      type="button"
                      onClick={() => setCartOpen(false)}
                      className="text-[#737373] text-[14px]"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="max-h-[320px] overflow-y-auto">
                    {cart.length === 0 ? (
                      <div className="px-4 py-6 text-[#737373] text-[14px]">
                        Cart is empty.
                      </div>
                    ) : (
                      cart.map((item) => {
                        const p = item?.product || {};
                        const img = p?.images?.[0]?.url;

                        return (
                          <div
                            key={p.id}
                            className="px-4 py-3 border-b border-[#F2F2F2] flex gap-3"
                          >
                            <div className="w-[64px] h-[64px] rounded-[8px] overflow-hidden bg-[#FAFAFA] border border-[#E6E6E6] shrink-0">
                              <img
                                src={img || "https://picsum.photos/200/200?random=1"}
                                alt={p?.name || "product"}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="text-[#252B42] font-bold text-[13px] truncate">
                                {p?.name || "Product"}
                              </div>

                              <div className="text-[#737373] text-[12px] mt-1">
                                ${Number(p?.price || 0).toFixed(2)} ×{" "}
                                <span className="font-bold">
                                  {item?.count || 0}
                                </span>
                              </div>

                              <div className="text-[#23856D] font-bold text-[13px] mt-1">
                                $
                                {(
                                  Number(p?.price || 0) *
                                  Number(item?.count || 0)
                                ).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  <div className="px-4 py-3 border-t border-[#E6E6E6]">
                    <div className="flex items-center justify-between text-[14px]">
                      <span className="text-[#737373]">Total</span>
                      <span className="font-bold text-[#252B42]">
                        ${cartTotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="mt-3 flex gap-2">
                      <Link
                        to="/cart"
                        onClick={() => setCartOpen(false)}
                        className="flex-1 h-10 rounded-[6px] border border-[#E6E6E6] text-[#252B42] font-bold text-[14px] flex items-center justify-center"
                      >
                        View Cart
                      </Link>

                      <Link
                        to="/order/create"
                        onClick={() => setCartOpen(false)}
                        className="flex-1 h-10 rounded-[6px] bg-[#23A6F0] text-white font-bold text-[14px] flex items-center justify-center"
                      >
                        Checkout
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

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

      {/* Mobile menu (aynı) */}
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
