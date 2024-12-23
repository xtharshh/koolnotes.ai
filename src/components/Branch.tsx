import React from 'react';

interface BranchProps {
  branches: { _id: string; title: string }[];
  selectedCollegeIndex: number;
  selectedBranchIndex: number | null;
  handleBranchClick: (collegeIndex: number, branchIndex: number) => void;
}

const Branch: React.FC<BranchProps> = ({ branches, selectedCollegeIndex, handleBranchClick }) => {
  return (
    <div className="grid grid-cols-1 mt-5 custom-md:grid-cols-4 custom-nmd:grid-cols-2">
      
      {branches.map((branch, branchIndex) => (
        <div key={branch._id} className="p-4">
          <button
            // className="bg-eclipse w-44 p-3 my-2 border-none rounded-lg w-44
            //  text-white  cursor-pointer text-lg 
            //    hover:bg-black "
               className="p-2 bg-eclipse  shadow-lg text-black font-new rounded-lg cursor-pointer text-center h-60 w-44 font-bold text-xl"
          
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
