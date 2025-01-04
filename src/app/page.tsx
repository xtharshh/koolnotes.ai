"use client"
import React from "react";
import { Introduction } from "../components/Introduction";
import SellectCollege from "../components/SelectCollege";
import AboutAndReviews from "../components/Reviews";
import NewFeatures from "../components/newFeatures";
import { Navbar } from "@/components/Navbar";
import { StatsSection } from "@/components/StatsSection";
import Footer from "@/components/Footer";
import ChatBox from "@/components/ChatBox";

export default function Home() {
  return (   

    <div className="min-h-screen animated-gradient">
    <Navbar />
    <main className="max-w-7xl mx-auto pt-16">
      <Introduction />
      <ChatBox />
      <StatsSection />
      <SellectCollege/>
    </main>
      <AboutAndReviews/>
      <NewFeatures/>
      <Footer/>
  </div>

  );
}