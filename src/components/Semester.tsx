"use client";
import { Button } from '@nextui-org/button';
import React, { useState } from 'react';

interface Subject {
  name: string;
  description: string;
  descriptionButtons?: { title: string; link: string }[];
}

interface Semester {
  name: string;
  subjects: Subject[];
}

interface SemesterProps {
  semesters: Semester[];
  selectedBranchIndex: number;
  handleSemesterClick: (semesterIndex: number | null) => void;
  handleSubjectClick: (subjectIndex: number | null) => void;
}

const SemesterComponent: React.FC<SemesterProps> = ({
  semesters,
  selectedBranchIndex,
  handleSemesterClick,
  handleSubjectClick,
}) => {
  const [selectedSemesterIndex, setSelectedSemesterIndex] = useState<number | null>(null);
  const [selectedSubjectIndex, setSelectedSubjectIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSemesterButtonClick = (index: number) => {
    setSelectedSemesterIndex(selectedSemesterIndex === index ? null : index);
    handleSemesterClick(index);
  };

  const handleSubjectButtonClick = (index: number) => {
    setSelectedSubjectIndex(index);
    setIsOpen(true);
    handleSubjectClick(index);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedSubjectIndex(null);
  };

  return (
    <div className="p-5 text-white">
      <h1 className="text-3xl dark:text-white text-black">Semesters</h1>
      <div className="grid grid-cols-4 gap-4 mt-5">
        {semesters.map((semester, index) => (
          <Button 
            key={index} 
            onClick={() => handleSemesterButtonClick(index)} 
            className="p-12 bg-orange-500 rounded-lg cursor-pointer text-center dark:bg-red-500"
          >
            <h3>{semester.name}</h3> 
          </Button>
        ))}
      </div>
      {selectedSemesterIndex !== null && (
        <h2 className="text-center my-5 text-2xl dark:text-white text-black">
          {semesters[selectedSemesterIndex].name}
        </h2>
      )}
      {selectedSemesterIndex !== null && (
        <div className="grid grid-cols-4 gap-2 mt-5">
          {semesters[selectedSemesterIndex].subjects.map((subject, subjectIndex) => (
            <button 
              key={subjectIndex} 
              onClick={() => handleSubjectButtonClick(subjectIndex)} 
              className="p-2 bg-green-600 text-white rounded-lg cursor-pointer text-center"
            >
              <h2>{subject.name}</h2>
            </button>
          ))}
        </div>
      )}
      {isOpen && selectedSubjectIndex !== null && (
        <div className="fixed dark:bg-black bg-white text-white  p-5  text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center z-50 w-4/5 h-4/5 rounded-lg border border-gray-200 overflow-hidden">

            <button onClick={closeModal} className="absolute top-2 right-2 p-2 dark:bg-black bg-white  dark:text-white text-black rounded-lg cursor-pointer">X</button>
            <h2 className="text-2xl mb-2 dark:text-white text-black">
              {selectedSemesterIndex !== null && selectedSubjectIndex !== null && semesters[selectedSemesterIndex].subjects[selectedSubjectIndex].name}
            </h2>
            <p className='dark:text-white text-black'>{selectedSemesterIndex !== null && selectedSubjectIndex !== null && semesters[selectedSemesterIndex].subjects[selectedSubjectIndex].description}</p>
            <div className="mt-5 dark:bg-black bg-white">
              {selectedSemesterIndex !== null && selectedSubjectIndex !== null && semesters[selectedSemesterIndex].subjects[selectedSubjectIndex].descriptionButtons?.map((button, index) => (
                <button
                  key={index}
                  onClick={() => window.open(button.link, '_blank')}
                  className="block w-1/2 p-2 my-1 bg-yellow-600 text-white rounded-lg cursor-pointer text-center"
                >
                  {button.title}
                </button>
              ))}
          
          </div>
        </div>
      )}
    </div>
  );
};

export default SemesterComponent;
