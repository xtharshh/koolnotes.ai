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
      
      <div className="flex justify-center">
        <select
          value={selectedCollegeIndex !== null ? selectedCollegeIndex : ""}
          onChange={handleCollegeClick}
          className="border p-2 rounded-l"
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
};

export default College;
