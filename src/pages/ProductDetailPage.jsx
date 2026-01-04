// src/pages/ProductDetailPage.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../store/actions/thunkActions";
import { addToCart } from "../store/actions/cartActions";
import ProductCard from "../components/ProductCard";

function Stars({ value = 0 }) {
  const v = Math.max(0, Math.min(5, Number(value || 0)));
  const full = Math.floor(v);
  const empty = 5 - full;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: full }).map((_, i) => (
        <span key={`f${i}`} className="text-[#F3CD03] text-[16px]">★</span>
      ))}
      {Array.from({ length: empty }).map((_, i) => (
        <span key={`e${i}`} className="text-[#BDBDBD] text-[16px]">★</span>
      ))}
    </div>
  );
}

function ProductDetailContent({ productId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector((s) => s?.product?.product);
  const fetchState = useSelector((s) => s?.product?.productFetchState);

  // bestseller için liste (elinde varsa)
  const productList = useSelector((s) => s?.product?.productList || []);

  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [tab, setTab] = useState("desc");

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  const isLoading = fetchState === "FETCHING";

  const images = useMemo(() => {
    const arr = Array.isArray(product?.images) ? product.images : [];
    return [...arr].sort((a, b) => (a?.index ?? 0) - (b?.index ?? 0));
  }, [product]);

  const activeImg = images?.[activeImgIdx]?.url || images?.[0]?.url;

  const onPrev = () => {
    if (images.length <= 1) return;
    setActiveImgIdx((i) => (i - 1 + images.length) % images.length);
  };

  const onNext = () => {
    if (images.length <= 1) return;
    setActiveImgIdx((i) => (i + 1) % images.length);
  };

  const bestseller = useMemo(() => productList.slice(0, 8), [productList]);

  return (
    <div className="w-full bg-white">
      <div className="w-full max-w-6xl mx-auto px-4">
        {/* breadcrumb */}
        <div className="py-6 flex items-center gap-2 text-[14px] leading-[24px] tracking-[0.2px]">
          <Link to="/" className="font-bold text-[#252B42]">Home</Link>
          <span className="text-[#BDBDBD]">{">"}</span>
          <span className="text-[#BDBDBD]">Shop</span>
        </div>

        {/* Loading */}
        {isLoading ? (
          <div className="w-full flex items-center justify-center py-16">
            <div className="w-10 h-10 rounded-full border-4 border-[#E6E6E6] border-t-[#23A6F0] animate-spin" />
          </div>
        ) : !product ? (
          <div className="text-[#737373] py-10">Product not found.</div>
        ) : (
          <>
            {/* TOP */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              {/* LEFT gallery */}
              <div className="w-full">
                {/* ✅ sabit height => sayfayı kaplamasın */}
                <div className="relative w-full rounded-[6px] overflow-hidden border border-[#E6E6E6] bg-[#F6F6F6]">
                  <div className="w-full h-[340px] md:h-[450px]">
                    <img
                      src={activeImg || "https://picsum.photos/1200/900?random=1"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={onPrev}
                        className="absolute left-6 top-1/2 -translate-y-1/2 text-white/90 text-[54px] leading-none select-none"
                        aria-label="Prev"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        onClick={onNext}
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-white/90 text-[54px] leading-none select-none"
                        aria-label="Next"
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>

                {/* ✅ thumbnails küçük ve sadece gerçekten varsa */}
                {images.length > 1 && (
                  <div className="mt-4 flex gap-4">
                    {images.slice(0, 2).map((im, idx) => {
                      const isActive = idx === activeImgIdx;
                      return (
                        <button
                          key={`${im?.url}-${idx}`}
                          type="button"
                          onClick={() => setActiveImgIdx(idx)}
                          className={`w-[100px] h-[75px] border rounded-[4px] overflow-hidden ${
                            isActive ? "border-[#23A6F0]" : "border-[#E6E6E6]"
                          }`}
                        >
                          <img
                            src={im?.url}
                            alt="thumb"
                            className="w-full h-full object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* RIGHT info */}
              <div className="w-full">
                <h1 className="text-[24px] font-bold text-[#252B42]">
                  {product.name}
                </h1>

                <div className="mt-2 flex items-center gap-3">
                  <Stars value={product.rating} />
                  <span className="text-[#737373] text-[14px] font-bold">10 Reviews</span>
                </div>

                <div className="mt-4 text-[24px] font-bold text-[#252B42]">
                  ${Number(product.price || 0).toFixed(2)}
                </div>

                <div className="mt-2 text-[14px] text-[#737373] font-bold">
                  Availability :{" "}
                  <span className="text-[#23A6F0]">
                    {Number(product.stock || 0) > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                <p className="mt-4 text-[#737373] text-[14px] leading-[22px] max-w-[460px]">
                  {product.description}
                </p>

                <div className="mt-6 w-full h-px bg-[#E6E6E6]" />

                <div className="mt-6 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#23A6F0]" />
                  <div className="w-7 h-7 rounded-full bg-[#23856D]" />
                  <div className="w-7 h-7 rounded-full bg-[#E77C40]" />
                  <div className="w-7 h-7 rounded-full bg-[#252B42]" />
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <button
                    type="button"
                    className="h-11 px-7 bg-[#23A6F0] text-white font-bold rounded-[5px]"
                  >
                    Select Options
                  </button>

                  <button
                    type="button"
                    className="w-11 h-11 rounded-full border border-[#E6E6E6] flex items-center justify-center"
                    aria-label="Favorite"
                  >
                    ♡
                  </button>
                 <button
  type="button"
  onClick={() => product && dispatch(addToCart(product))}
  className="w-11 h-11 rounded-full border border-[#E6E6E6] flex items-center justify-center"
  aria-label="Cart"
>
  🛒
</button>
                  <button
                    type="button"
                    className="w-11 h-11 rounded-full border border-[#E6E6E6] flex items-center justify-center"
                    aria-label="View"
                  >
                    👁
                  </button>
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 border border-[#E6E6E6] rounded-[6px] text-[#252B42]"
                  >
                    ← Back
                  </button>
                  <Link to="/shop" className="text-[#23A6F0] font-bold">
                    Back to Shop
                  </Link>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-12 border-t border-[#E6E6E6]">
              <div className="flex items-center justify-center gap-10 py-6 text-[14px] font-bold">
                <button
                  type="button"
                  onClick={() => setTab("desc")}
                  className={tab === "desc" ? "text-[#252B42]" : "text-[#737373]"}
                >
                  Description
                </button>
                <button
                  type="button"
                  onClick={() => setTab("info")}
                  className={tab === "info" ? "text-[#252B42]" : "text-[#737373]"}
                >
                  Additional Information
                </button>
                <button
                  type="button"
                  onClick={() => setTab("reviews")}
                  className={tab === "reviews" ? "text-[#23856D]" : "text-[#737373]"}
                >
                  Reviews (0)
                </button>
              </div>

              <div className="border-t border-[#E6E6E6] py-10">
                {tab === "desc" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
                    <div className="md:col-span-1">
                      <div className="w-full h-[300px] rounded-[10px] overflow-hidden border border-[#E6E6E6] bg-[#F6F6F6]">
                        <img
                          src="https://picsum.photos/900/700?random=99"
                          alt="desc"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-1">
                      <h3 className="text-[#252B42] font-bold text-[24px] mb-4">
                        the quick fox jumps over
                      </h3>
                      <p className="text-[#737373] text-[14px] leading-[22px]">
                        Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
                        RELIT official consequent door ENIM RELIT Mollie. Excitation venial
                        consequent sent nostrum met.
                      </p>
                      <p className="mt-6 text-[#737373] text-[14px] leading-[22px]">
                        Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
                        RELIT official consequent door ENIM RELIT Mollie. Excitation venial
                        consequent sent nostrum met.
                      </p>
                    </div>

                    <div className="md:col-span-1">
                      <h3 className="text-[#252B42] font-bold text-[24px] mb-4">
                        the quick fox jumps over
                      </h3>
                      <ul className="space-y-3 text-[#737373] text-[14px]">
                        {Array.from({ length: 7 }).map((_, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="text-[#737373]">›</span>
                            <span>the quick fox jumps over the lazy dog</span>
                          </li>
                        ))}
                      </ul>

                      <h3 className="text-[#252B42] font-bold text-[24px] mt-8 mb-4">
                        the quick fox jumps over
                      </h3>
                      <ul className="space-y-3 text-[#737373] text-[14px]">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <li key={`b${i}`} className="flex items-center gap-2">
                            <span className="text-[#737373]">›</span>
                            <span>the quick fox jumps over the lazy dog</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {tab === "info" && (
                  <div className="text-[#737373] text-[14px] leading-[22px]">
                    Additional Information placeholder.
                  </div>
                )}

                {tab === "reviews" && (
                  <div className="text-[#737373] text-[14px] leading-[22px]">
                    Reviews placeholder (0).
                  </div>
                )}
              </div>
            </div>

            {/* BESTSELLER */}
            <div className="mt-6">
              <div className="font-bold text-[24px] text-[#252B42]">
                BESTSELLER PRODUCTS
              </div>
              <div className="mt-3 w-full h-px bg-[#E6E6E6]" />

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {bestseller.map((p) => {
                  const firstImg =
                    p?.images?.[0]?.url || `https://picsum.photos/800/900?random=${p.id}`;

                  return (
                    <div key={p.id} className="w-full">
                      <ProductCard
                        variant="compact" // ✅ fark burada
                        id={p.id}
                        to={`/product/${p.id}`}
                        img={firstImg}
                        title={p.name || "Graphic Design"}
                        department="English Department"
                        priceOld={`$${(Number(p.price || 0) * 1.25).toFixed(2)}`}
                        priceNew={`$${Number(p.price || 0).toFixed(2)}`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const { productId } = useParams();
  return <ProductDetailContent key={productId} productId={productId} />;
}
