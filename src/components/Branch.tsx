import React from 'react';

interface BranchProps {
  branches: { _id: string; title: string }[];
  selectedCollegeIndex: number;
  selectedBranchIndex: number | null;
  handleBranchClick: (collegeIndex: number, branchIndex: number) => void;
}

const Branch: React.FC<BranchProps> = ({ branches, selectedCollegeIndex, handleBranchClick }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {branches.map((branch, branchIndex) => (
        <div key={branch._id} className="flex-1 max-w-1/5 p-2 box-border">
          <button
            className="w-44 p-3 my-2 border-none rounded-lg  text-black  cursor-pointer text-lg transition-colors duration-300 dark:bg-white hover:bg-gray-200 bg-yellow-500"
            onClick={() => handleBranchClick(selectedCollegeIndex, branchIndex)}
          >
            {branch.title}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Branch;
