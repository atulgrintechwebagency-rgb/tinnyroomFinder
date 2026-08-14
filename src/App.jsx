import React from "react";
import { Routes, Route } from "react-router-dom";

// Home
import Homepage from "./pages/Home/Homepage";

// Listing
import ListTinySpace from "./pages/ListTinySpace/ListTinySpace";
import AllListing from "./pages/Listing/AllListing";
import SingleListing from "./pages/SingleListing/SingleListing";

// Main Pages
import HowItWork from "./pages/HowItWorks/HowItWork";
import Pricing from "./pages/Pricing/Pricing";
import Resource from "./pages/Resource/Resource";
import About from "./pages/About/About";
import ContactUs from "./pages/Contact/ContactUs";

// Legal Pages
import PrivacyPolicy from "./pages/Terms/PrivacyPolicy";
import Terms from "./pages/Terms/Terms";
import CookiePolicy from "./pages/Terms/CookiePolicy";

// Account Pages
import Login from "./pages/Accounts/Login";
import SignUp from "./pages/Accounts/SignUp";
import ForgotPassword from "./pages/Accounts/ForgotPassword";
import ResetPassword from "./pages/Accounts/ResetPassword";
import ResendVerification from "./pages/Accounts/ResendVerification";
import ResendResetPassword from "./pages/Accounts/ResendResetPassword";


const App = () => {

  return (

    <Routes>

      {/* =====================================================
          HOME
      ====================================================== */}

      <Route
        path="/"
        element={<Homepage />}
      />


      {/* =====================================================
          LISTING PAGES
      ====================================================== */}

      <Route
        path="/list-a-space"
        element={<ListTinySpace />}
      />

      <Route
        path="/all-listing"
        element={<AllListing />}
      />


      {/* =====================================================
          SINGLE LISTING
          
          Example:
          /single-listing/cozy-loft-studio
          
          OR:
          /single-listing/aut-et-consequatur-f-X9cifYSh
      ====================================================== */}

      <Route
        path="/single-listing/:slug"
        element={<SingleListing />}
      />


      {/* =====================================================
          OTHER MAIN PAGES
      ====================================================== */}

      <Route
        path="/how-it-works"
        element={<HowItWork />}
      />

      <Route
        path="/pricing"
        element={<Pricing />}
      />

      <Route
        path="/resources"
        element={<Resource />}
      />

      <Route
        path="/about"
        element={<About />}
      />

      <Route
        path="/contact"
        element={<ContactUs />}
      />


      {/* =====================================================
          LEGAL PAGES
      ====================================================== */}

      <Route
        path="/terms"
        element={<Terms />}
      />

      <Route
        path="/privacy-policy"
        element={<PrivacyPolicy />}
      />

      <Route
        path="/cookie-policy"
        element={<CookiePolicy />}
      />


      {/* =====================================================
          ACCOUNT PAGES
      ====================================================== */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<SignUp />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />

      <Route
        path="/resend-verification"
        element={<ResendVerification />}
      />

      <Route
        path="/resend-reset-password"
        element={<ResendResetPassword />}
      />


    </Routes>

  );

};

export default App;