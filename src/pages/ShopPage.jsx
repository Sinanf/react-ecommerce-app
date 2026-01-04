// src/pages/ShopPage.jsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ProductCard from "../components/ProductCard";
import { fetchCategoriesIfNeeded, fetchProductsByQuery } from "../store/actions/thunkActions";
import { setFilter, setSort } from "../store/actions/productActions";

export default function ShopPage() {
  const dispatch = useDispatch();
  const { categoryId } = useParams(); // /shop/:gender/:categoryName/:categoryId

  // categories (T12)
  const categories = useSelector((s) => s?.product?.categories || []);
  const categoryFetchState = useSelector((s) => s?.product?.fetchState);

  // products (T13/T14)
  const productList = useSelector((s) => s?.product?.productList || []);
  const total = useSelector((s) => s?.product?.total || 0);
  const productFetchState = useSelector((s) => s?.product?.productFetchState);

  // query states
  const filter = useSelector((s) => s?.product?.filter || "");
  const sort = useSelector((s) => s?.product?.sort || "");

  // UI controlled states
  const [filterInput, setFilterInput] = useState(filter);
  const [sortDraft, setSortDraft] = useState(sort);

  useEffect(() => {
    dispatch(fetchCategoriesIfNeeded());
  }, [dispatch]);

  // filter input -> store filter (debounce)
  useEffect(() => {
    const t = setTimeout(() => {
      dispatch(setFilter(filterInput));
    }, 400);
    return () => clearTimeout(t);
  }, [dispatch, filterInput]);

  // categoryId OR filter OR sort change => refetch (keep others)
  useEffect(() => {
    dispatch(fetchProductsByQuery({ categoryId }));
  }, [dispatch, categoryId, filter, sort]);

  const isLoadingCategories = categoryFetchState === "FETCHING" && categories.length === 0;
  const isLoadingProducts = productFetchState === "FETCHING";

  const onClickFilterButton = () => {
    // sort sadece burada state’e yazılıyor (requirement)
    dispatch(setSort(sortDraft));
  };

  return (
    <div className="w-full flex flex-col bg-white">
      {/* PAGE HEADER */}
      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 pt-8 pb-4 flex flex-col gap-3">
          <div className="w-full flex flex-row items-center justify-between">
            <div className="font-bold text-[24px] leading-[32px] tracking-[0.1px] text-[#252B42]">
              Shop
            </div>

            <div className="hidden md:flex flex-row items-center gap-2 text-[14px] leading-[24px] tracking-[0.2px]">
              <Link to="/" className="font-bold text-[#252B42]">
                Home
              </Link>
              <span className="text-[#BDBDBD]">{">"}</span>
              <span className="text-[#BDBDBD]">Shop</span>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY CARDS (ALL) */}
      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 pb-6">
          {isLoadingCategories ? (
            <div className="text-[#737373] text-[14px] py-6">Loading categories...</div>
          ) : categories.length === 0 ? (
            <div className="text-[#737373] text-[14px] py-6">No categories found.</div>
          ) : (
            <div className="w-full flex flex-row gap-4 overflow-x-auto md:overflow-visible">
              {categories.map((c) => (
                <Link
                  key={c.id}
                  to={`/shop/${c.gender === "k" ? "kadin" : "erkek"}/${String(c.code?.split(":")?.[1] || c.title)
                    .toLowerCase()
                    .replaceAll("ç", "c")
                    .replaceAll("ğ", "g")
                    .replaceAll("ı", "i")
                    .replaceAll("ö", "o")
                    .replaceAll("ş", "s")
                    .replaceAll("ü", "u")
                    .replace(/\s+/g, "-")}/${c.id}`}
                  className="shrink-0 w-[240px] h-[240px] md:w-[210px] md:h-[210px] relative flex"
                >
                  <img src={c.img} alt={c.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="font-bold text-[16px] leading-[24px] tracking-[0.1px] text-white">
                      {c.title}
                    </div>
                    <div className="text-[14px] leading-[24px] tracking-[0.2px] text-white">
                      Rating: {c.rating}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* TOOLBAR */}
      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-[14px] leading-[24px] tracking-[0.2px] text-[#737373]">
            Showing {productList.length} of {total} results
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
            {/* filter input */}
            <input
              value={filterInput}
              onChange={(e) => setFilterInput(e.target.value)}
              placeholder="Search..."
              className="h-10 px-4 border border-[#E6E6E6] text-[14px] text-[#737373] bg-white"
            />

            {/* sort */}
            <select
              value={sortDraft}
              onChange={(e) => setSortDraft(e.target.value)}
              className="h-10 px-4 border border-[#E6E6E6] text-[14px] text-[#737373] bg-white"
            >
              <option value="">Sort</option>
              <option value="price:asc">price:asc</option>
              <option value="price:desc">price:desc</option>
              <option value="rating:asc">rating:asc</option>
              <option value="rating:desc">rating:desc</option>
            </select>

            <button
              type="button"
              onClick={onClickFilterButton}
              className="h-10 px-6 bg-[#23A6F0] text-white font-bold text-[14px] rounded-[5px]"
            >
              Filter
            </button>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 py-6">
          {isLoadingProducts ? (
            <div className="w-full flex items-center justify-center py-16">
              <div className="w-10 h-10 rounded-full border-4 border-[#E6E6E6] border-t-[#23A6F0] animate-spin" />
            </div>
          ) : (
            <div className="flex flex-row flex-wrap justify-center gap-6">
              {productList.map((p) => {
                const firstImg = p?.images?.[0]?.url;
                return (
                  <div key={p.id} className="w-full md:w-[calc(25%-18px)] flex">
                    <ProductCard
                      id={p.id}
                      img={firstImg || "https://picsum.photos/800/900?random=1"}
                      title={p.name}
                      department="English Department"
                      priceOld={`$${(Number(p.price) * 1.25).toFixed(2)}`}
                      priceNew={`$${Number(p.price).toFixed(2)}`}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
