import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Home/Homepage';
import ListTinySpace from "./pages/ListTinySpace/ListTinySpace";
import AllListing from './pages/Listing/AllListing';
import SingleListing from './pages/SingleListing/SingleListing';
import HowItWork from './pages/HowItWorks/HowItWork';
import Pricing from './pages/Pricing/Pricing';
import  Resource  from './pages/Resource/Resource';
import About from './pages/About/About';
import ContactUs from './pages/Contact/ContactUs';
import PrivacyPolicy from './pages/Terms/PrivacyPolicy';
import Terms from './pages/Terms/Terms';
import CookiePolicy from './pages/Terms/CookiePolicy';
import Login from './pages/Accounts/Login';
import SignUp from './pages/Accounts/SignUp';
import ForgotPassword from './pages/Accounts/ForgotPassword';
import ResetPassword from './pages/Accounts/ResetPassword';
import ResendVerification from './pages/Accounts/ResendVerification';
import ResendResetPassword from './pages/Accounts/ResendResetPassword';



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/list-a-space" element={<ListTinySpace />} />
      <Route path= "/all-listing" element={<AllListing />} />
      <Route path= "/single-listing"  element= {<SingleListing />} />
      <Route path= "/how-it-works" element= {<HowItWork />} />
      <Route path="/pricing" element= {<Pricing />} />
      <Route path= "/resources" element= {<Resource />} />
      <Route path= "/contact" element= {<ContactUs />} />
      <Route path= "/about" element= {<About />} />
      <Route path= "/terms" element= {<Terms />} />
      <Route path= "/privacy-policy" element= {<PrivacyPolicy />} />
      <Route path= "/cookie-policy" element= {<CookiePolicy />} />
      <Route path= "/login" element= {<Login />} />
      <Route path="/signup" element= {<SignUp />} />
      <Route path="/forgot-password" element= {<ForgotPassword />} />
      <Route path="/reset-password" element= { <ResetPassword />} />
      <Route path="/resend-verification" element={<ResendVerification />} />
      <Route path="/resend-reset-password" element={ <ResendResetPassword />} />

    </Routes>
  );
};

export default App;