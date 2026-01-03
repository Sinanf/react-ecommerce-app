// src/App.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import PageContent from "./layout/PageContent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { fetchCategoriesIfNeeded, verifyToken } from "./store/actions/thunkActions";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyToken());
    dispatch(fetchCategoriesIfNeeded());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageContent />
      <Footer />

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  );
}
