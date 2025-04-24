/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useState } from "react";
import { Introduction } from "../components/Introduction";
import SellectCollege from "../components/SelectCollege";
import AboutAndReviews from "../components/Reviews";
import NewFeatures from "../components/newFeatures";
import { StatsSection } from "../components/StatsSection";
import Footer from "../components/Footer";
import ChatBox from "../components/ChatBox";
import Navbar from "../components/Navbar";

export default function Home() {
  const [showContributors, setShowContributors] = useState(false);

  const handleNavigation = () => {
    setShowContributors(false);
  };

  return (   
    <div className="min-h-screen animated-gradient">
        <>
          <main className="max-w-7xl mx-auto pt-16">
            <Introduction />
            <ChatBox />
            <StatsSection />
            <SellectCollege />
          </main>
            <AboutAndReviews />
            <NewFeatures />
        </>
      <Footer />
    </div>
  );
}