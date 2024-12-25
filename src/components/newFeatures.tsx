import React from "react";
import FeaureCard from "./ui/featureCard";

export default function NewFeatures() {
  return (
    <>
    <div className="bg-white dark:bg-black text-black dark:text-white">
      <h1 className="text-4xl font-bold font-newLuck text-center pt-10">New Features</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-16 pt-10 pb-24">
        <FeaureCard />
        <FeaureCard />
        <FeaureCard />
        <FeaureCard />
      </div>
    </div>
    </>
  );
}
