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
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";

import RequireAuth from "./RequireAuth";
import CreateOrderAddressPage from "../pages/CreateOrderAddressPage";
import CreateOrderPaymentPage from "../pages/CreateOrderPaymentPage";
import PreviousOrdersPage from "../pages/PreviousOrdersPage";

export default function AppRouter() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/shop/:gender/:categoryName/:categoryId" element={<ShopPage />} />
      <Route path="/cart" element={<CartPage />} />

      {/* Protected order flow */}
      <Route
        path="/order/create"
        element={
          <RequireAuth>
            <CreateOrderAddressPage />
          </RequireAuth>
        }
      />
      <Route
        path="/order/payment"
        element={
          <RequireAuth>
            <CreateOrderPaymentPage />
          </RequireAuth>
        }
      />
      <Route
        path="/orders"
        element={
          <RequireAuth>
            <PreviousOrdersPage />
          </RequireAuth>
        }
      />

      {/* Auth */}
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Product pages */}
      <Route path="/product" element={<ProductPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route
        path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId"
        element={<ProductDetailPage />}
      />

      {/* Static pages */}
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/about" element={<AboutPage />} />

      {/* Blog */}
      <Route path="/blog/:id" element={<BlogPostPage />} />

      {/* Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
