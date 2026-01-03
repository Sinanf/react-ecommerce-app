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
import TeamPage from "../pages/TeamPage";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/shop" element={<ShopPage />} />

      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/product" element={<ProductPage />} />
      <Route path="/product/:id" element={<ProductPage />} />

      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/about" element={<AboutPage />} />

      <Route path="/blog/:id" element={<BlogPostPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
