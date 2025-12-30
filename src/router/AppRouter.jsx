// src/router/AppRouter.jsx
import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import ShopPage from "../pages/ShopPage";
import ProductPage from "../pages/ProductPage";
import PricingPage from "../pages/PricingPage";
import ContactPage from "../pages/ContactPage";
import AboutPage from "../pages/AboutPage";
import BlogPostPage from "../pages/BlogPostPage";
import NotFoundPage from "../pages/NotFoundPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* basic routes for links used in header + homepageData */}
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<AboutPage />} />

      {/* blog links like /blog/1 */}
      <Route path="/blog/:id" element={<BlogPostPage />} />

      {/* fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
