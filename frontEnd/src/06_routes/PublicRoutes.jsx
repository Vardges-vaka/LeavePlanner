import React from "react";
import { Routes, Route } from "react-router-dom";
import { lazy } from "react";

const Home = lazy(() => import("../05_pages/00_public/home/Home.jsx"));
const Contact = lazy(() => import("../05_pages/00_public/contact/Contact.jsx"));
const FAQ = lazy(() => import("../05_pages/00_public/legal/FAQ.jsx"));
const TnC = lazy(() => import("../05_pages/00_public/legal/TnC.jsx"));
const Privacy = lazy(() => import("../05_pages/00_public/legal/Privacy.jsx"));

const Test = lazy(() => import("../05_pages/__test/Test.jsx"));

const PublicRoutes = () => {
  return (
    <Routes>
      {/* // ! Test route */}
      <Route path="t" element={<Test />} />

      {/* Home route */}
      <Route path="" element={<Home />} />

      {/* Contact route */}
      <Route path="contact" element={<Contact />} />

      {/* FAQ route */}
      <Route path="faq" element={<FAQ />} />

      {/* TnC route */}
      <Route path="tnc" element={<TnC />} />

      {/* Privacy route */}
      <Route path="privacy" element={<Privacy />} />
    </Routes>
  );
};

export default PublicRoutes;
