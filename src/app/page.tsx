"use client"
import React from "react";
import Introduction from "../components/Introduction";
import SellectCollege from "../components/SelectCollege";
import AboutAndReviews from "@/components/Reviews";


export default function Home() {
  return (   

      <>
      <Introduction />
      <SellectCollege />
      <AboutAndReviews />
      </>

  );
}