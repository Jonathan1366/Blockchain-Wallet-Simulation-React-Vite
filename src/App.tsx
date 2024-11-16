"use client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignupForm } from "./lib/pages/SignupForm";
import StartPage from "./lib/pages/Start-Page";
import { AnimatePresence } from "framer-motion";
import AppAppBar from "./lib/marketing-page/components/AppBar";
import Hero from "./lib/marketing-page/components/Hero";
import Features from "./lib/marketing-page/components/Feature";
import MarketingPage from "./lib/marketing-page/MarketingPage";
import TransferPage from "./lib/transfer-page/transferpage";

export function App() {
  return (
    <Router>
      <AnimatePresence onExitComplete={SignupForm} />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/appappbar" element={<AppAppBar />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/features" element={<Features />} />
        <Route path="/marketingpage" element={<MarketingPage />} />
        <Route path="/transferpage" element ={<TransferPage/>}></Route>
      </Routes>
    </Router>
  );
}
