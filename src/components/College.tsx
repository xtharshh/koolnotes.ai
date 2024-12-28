"use client";

import React, { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

interface CollegeProps {
  colleges: { _id: string; name: string }[];
  selectedCollegeIndex: number | null;
  handleCollegeClick: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const College: React.FC<CollegeProps> = React.memo(function College({ colleges, selectedCollegeIndex, handleCollegeClick }) {
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
    <div ref={scrollRef} data-scroll-container className="text-center ">
      <p className="text-red-500 font-bold font-newMono text-4xl py-10" data-scroll-section>
        <span className='p-2'>Discover the amazing features we offer to enhance your study.</span>
      </p>
      <h1 className="text-4xl mb-5 font-newLuck" data-scroll-section>SELECT YOUR COLLEGE</h1>
      
      <div className="flex justify-center">
        <select
          value={selectedCollegeIndex !== null ? selectedCollegeIndex : ""}
          onChange={handleCollegeClick}
          className="border p-2 rounded-l font-newLuck-semibold-600 text-xl dark:bg-gray-800 dark:text-white dark:border-gray-700"
        >
          <option value="" disabled>
            Select College
          </option>
          {colleges.map((college, index) => (
            <option key={college._id} value={index}>
              {college.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
});

export default College;
