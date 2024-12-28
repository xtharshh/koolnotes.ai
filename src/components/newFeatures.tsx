'use client';

import React, { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import FeatureCard from './ui/featureCard';

const NewFeatures = React.memo(() => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const scroll = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        multiplier: 1.2,
      });

      return () => {
        scroll.destroy();
      };
    }
  }, []);

  return (
    <div ref={scrollRef} data-scroll-container id="features">
      <div className="bg-white dark:bg-black text-black dark:text-white">
        <h1 className="text-4xl font-bold font-newLuck text-center pt-10">New Features</h1>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xlg:grid-cols-4 gap-4 p-18 pt-10 pb-32" data-scroll-section>
            <FeatureCard
              name="Jobs & Internships"
              src="https://res.cloudinary.com/djcbdfehg/image/upload/v1735296984/jobs2.jpg"
            />
            <FeatureCard
              name="Ai Summary"
              src="https://res.cloudinary.com/djcbdfehg/image/upload/v1735296984/ai-summary.jpg"
            />
            <FeatureCard
              name="Upload & Earn"
              src="https://res.cloudinary.com/djcbdfehg/image/upload/v1735296984/uploadearn.jpg"
            />
            <FeatureCard
              name="PixelWalls"
              src="https://res.cloudinary.com/djcbdfehg/image/upload/v1735296984/pixelwalls.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

NewFeatures.displayName = 'NewFeatures';

export default NewFeatures;
