'use client';
import React from 'react';

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
  "Mechanical":"https://res.cloudinary.com/djcbdfehg/image/upload/v1735296984/mechanical.jpg",// Add other branches with their respective Cloudinary images
};

const Branch: React.FC<BranchProps> = React.memo(({ branches, selectedCollegeIndex, handleBranchClick }) => {
  return (
    <div className="grid grid-cols-1 mt-5 custom-md:grid-cols-2 custom-lg:grid-cols-3 vlg:grid-cols-4 text-center">
      {branches.map((branch, branchIndex) => (
        <div key={branch._id} className="pt-4 pb-4">
          <button
            className="shadow-lg text-black font-newLuck rounded-lg cursor-pointer text-center h-60 w-72 font-bold text-2xl"
            onClick={() => handleBranchClick(selectedCollegeIndex, branchIndex)}
            style={{ 
              backgroundImage: `url(${branchBackgrounds[branch.title]})`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
              color: 'white'
            }}
          >
            
          </button>
        </div>
      ))}
    </div>
  );
});

Branch.displayName = 'Branch';

export default Branch;
