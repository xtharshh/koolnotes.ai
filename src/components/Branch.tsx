'use client';
import React, { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

interface BranchProps {
  branches: { _id: string; title: string }[];
  selectedCollegeIndex: number;
  selectedBranchIndex: number | null;
  handleBranchClick: (collegeIndex: number, branchIndex: number) => void;
}

// Map branch titles to Cloudinary background image URLs
const branchBackgrounds: Record<string, string> = {
  "Information Technology": "https://res.cloudinary.com/djcbdfehg/image/upload/v1735296984/information-technology.jpg",
  "Computer Science & Engineering": "https://res.cloudinary.com/djcbdfehg/image/upload/v1735296984/cse.jpg",
  "AI & DS": "https://res.cloudinary.com/djcbdfehg/image/upload/v1735296984/aids.jpg",
  "Mechanical":"https://res.cloudinary.com/djcbdfehg/image/upload/v1735296984/mechanical.jpg",
  // Add other branches with their respective Cloudinary images
};

const Branch: React.FC<BranchProps> = React.memo(({ branches, selectedCollegeIndex, handleBranchClick }) => {
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
    <div ref={scrollRef} data-scroll-container className="grid grid-cols-1 mt-5 custom-md:grid-cols-4 custom-nmd:grid-cols-2">
      {branches.map((branch, branchIndex) => (
        <div key={branch._id} className="pt-4 pb-4" data-scroll data-scroll-speed="1">
          <button
            className="relative shadow-lg text-white font-newLuck rounded-lg cursor-pointer text-center h-60 w-72 font-bold text-2xl overflow-hidden"
            onClick={() => handleBranchClick(selectedCollegeIndex, branchIndex)}
            style={{ 
              backgroundImage: `url(${branchBackgrounds[branch.title]})`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
            }}
          >
            {/* Overlay */}
            
          </button>
        </div>
      ))}
    </div>
  );
});

Branch.displayName = 'Branch';

export default Branch;
