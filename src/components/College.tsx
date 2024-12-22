import React from 'react';

interface CollegeProps {
  colleges: { _id: string; name: string }[];
  selectedCollegeIndex: number | null;
  handleCollegeClick: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const College: React.FC<CollegeProps> = ({ colleges, selectedCollegeIndex, handleCollegeClick }) => {
  return (
    <div className="text-center">
      <h1 className="text-4xl mb-5 dark:text-white text-black">SELECT YOUR COLLEGE</h1>
      <select onChange={handleCollegeClick} className="p-3 w-1/2 mb-5 text-lg text-black dark:text-white rounded-lg border-none dark:bg-gray-800 bg-gray-200 ">
        <option value="" className='dark:text-white text-red-900'>Select College</option>
        {colleges.map((college, index) => (
          <option key={college._id} value={index} className='dark:text-white' >
            {college.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default College;
