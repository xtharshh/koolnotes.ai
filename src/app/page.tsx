"use client"
import React from "react";
import Introduction from "../components/Introduction";
import SellectCollege from "../components/SelectCollege";
import AboutAndReviews from "@/components/Reviews";
import NewFeatures from "@/components/newFeatures";


export default function Home() {
  return (   

      <>
      <Introduction />
      <SellectCollege />
      <AboutAndReviews />
      <NewFeatures/>
      </>

  );
}