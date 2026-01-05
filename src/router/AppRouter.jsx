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

// ✅ T21 - Step 2
import CreateOrderPaymentPage from "../pages/CreateOrderPaymentPage";

import PreviousOrdersPage from "../pages/PreviousOrdersPage";


export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/shop" element={<ShopPage />} />
      <Route path="/shop/:gender/:categoryName/:categoryId" element={<ShopPage />} />

      <Route path="/cart" element={<CartPage />} />

      {/* ✅ Create Order Flow */}
      <Route
        path="/order/create"
        element={
          <RequireAuth>
            <CreateOrderAddressPage />
          </RequireAuth>
        }
      />

      {/* ✅ T21: Step 2 - Credit Card */}
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


      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/product" element={<ProductPage />} />
      <Route path="/product/:id" element={<ProductPage />} />

      <Route
        path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId"
        element={<ProductDetailPage />}
      />

      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/about" element={<AboutPage />} />

      <Route path="/blog/:id" element={<BlogPostPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
