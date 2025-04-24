'use client';

import React from 'react';
import FeatureCard from './ui/featureCard';

const NewFeatures = React.memo(() => {
  return (
    <div id="features">
      <div className="bg-white dark:bg-black text-black dark:text-white">
        <h1 className="text-4xl font-bold font-newLuck text-center pt-10">New Features</h1>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xlg:grid-cols-4 gap-4 p-18 pt-10 pb-32">
            <FeatureCard
              name="Jobs & Internships"
              src="https://res.cloudinary.com/djcbdfehg/image/upload/v1735296984/jobs2.jpg"
              link="https://job-seeking-web-application-hp.netlify.app"
            />
            <FeatureCard
              name="Ai Summary"
              src="https://res.cloudinary.com/djcbdfehg/image/upload/v1735296984/ai-summary.jpg"
              link="#chatbot"
            />
            <FeatureCard
              name="Upload & Earn"
              src="https://res.cloudinary.com/djcbdfehg/image/upload/v1735296984/uploadearn.jpg"
              link="/upload"
            />
            <FeatureCard
              name="PixelWalls"
              src="https://res.cloudinary.com/djcbdfehg/image/upload/v1735296984/pixelwalls.jpg"
              link="/pixelwalls"

            />
            <FeatureCard
              name="DSA Algorithms"
              src="https://res.cloudinary.com/djcbdfehg/image/upload/v1735296984/jobs.jpg"
              link="https://dsa-sortingvisualizer.vercel.app/"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

NewFeatures.displayName = 'NewFeatures';

export default NewFeatures;
