"use client";
import React, { useRef, useState } from 'react';
// import Eclipse from "../assets/Eclipse.jpeg"; // Ensure the correct path

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
  handleSemesterClick,
  handleSubjectClick,
}) => {
  const [selectedSemesterIndex, setSelectedSemesterIndex] = useState<number | null>(null);
  const [selectedSubjectIndex, setSelectedSubjectIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const subjectRef = useRef<HTMLDivElement | null>(null);
  const descriptionRef = useRef<HTMLDivElement | null>(null);

  const handleSemesterButtonClick = (index: number) => {
    setSelectedSemesterIndex(selectedSemesterIndex === index ? null : index);
    handleSemesterClick(index);
    setTimeout(() => {
      subjectRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const handleSubjectButtonClick = (index: number) => {
    setSelectedSubjectIndex(index);
    setIsOpen(true);
    handleSubjectClick(index);
    setTimeout(() => {
      descriptionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedSubjectIndex(null);
    setTimeout(() => {
      subjectRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <div className="p-5">
      <div className="w-full">
        <h1 className="text-4xl  font-bold font-newLuck text-center">Semesters</h1>
        <div className=" sm:grid-cols-2 custom-lg:grid-cols-4 gap-4  
        grid grid-cols-1 mt-5 custom-md:grid-cols-4 custom-nmd:grid-cols-2">
          {semesters.map((semester, index) => (
            <button 
              key={index} 
              onClick={() => handleSemesterButtonClick(index)}  
              className="p-2 bg-eclipse bg-cover bg-center shadow-lg text-3xl rounded-lg font-newLuck cursor-pointer text-center h-44 w-25 font-bold "
            >
              <h3>{semester.name}</h3> 
            </button>
          ))}
        </div>
        {selectedSemesterIndex !== null && (
          <h2 className="text-center my-5 text-3xl font-bold font-newLuck">
            {semesters[selectedSemesterIndex].name}
          </h2>
        )}
        {selectedSemesterIndex !== null && (
          <div ref={subjectRef}>
            <div className="grid grid-cols-1 sm:grid-cols-2 custom-lg:grid-cols-4 gap-4 mt-5">
              {semesters[selectedSemesterIndex].subjects.map((subject, subjectIndex) => (
                <button 
                  key={subjectIndex} 
                  onClick={() => handleSubjectButtonClick(subjectIndex)} 
                  className="p-2 bg-eclipse rounded-lg cursor-pointer text-center h-16 w-30 font-bold font-newLuck text-lg"
                >
                  <h2>{subject.name}</h2>
                </button>
              ))}
            </div>
          </div>
        )}
        {isOpen && selectedSubjectIndex !== null && (
          <div className="fixed bg-white dark:bg-black text-black dark:text-white  p-5 text-center left-1/2 
          transform -translate-x-1/2 -translate-y-1/2 
          justify-center z-50 w-4/5 h-2/3 rounded-lg border border-gray-400 overflow-hidden mt-10">
            <button onClick={closeModal} className="absolute top-2 right-2 p-2 rounded-lg cursor-pointer font-bold font-newLuck">X</button>
            <div ref={descriptionRef}>
              <h2 className="text-2xl mb-2  font-bold font-newLuck">
                {selectedSemesterIndex !== null && selectedSubjectIndex !== null && semesters[selectedSemesterIndex].subjects[selectedSubjectIndex].name}
              </h2>
              <p className=' font-bold font-newLuck'>{selectedSemesterIndex !== null && selectedSubjectIndex !== null && semesters[selectedSemesterIndex].subjects[selectedSubjectIndex].description}</p>
              <div className="mt-5 ">
                {selectedSemesterIndex !== null && selectedSubjectIndex !== null && semesters[selectedSemesterIndex].subjects[selectedSubjectIndex].descriptionButtons?.map((button, index) => (
                  <button
                    key={index}
                    onClick={() => window.open(button.link, '_blank')}
                    className="block w-1/2 p-2 my-1 bg-yellow-600 text-black rounded-lg cursor-pointer text-center font-newLuck"
                  >
                    {button.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SemesterComponent;
