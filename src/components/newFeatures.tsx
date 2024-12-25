import React from "react";
import FeatureCard from "./ui/featureCard";

const NewFeatures = React.memo(() => {
  return (
    <>
      <div className="bg-white dark:bg-black text-black dark:text-white">
        <h1 className="text-4xl font-bold font-newLuck text-center pt-10">New Features</h1>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xlg:grid-cols-4 gap-4 p-16 pt-10 pb-24">
            <FeatureCard />
            <FeatureCard />
            <FeatureCard />
            <FeatureCard />
          </div>
        </div>
      </div>
    </>
  );
});

NewFeatures.displayName = "NewFeatures";

export default NewFeatures;