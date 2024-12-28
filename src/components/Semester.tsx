'use client';
import React, { useEffect, useRef, useState } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

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
  const [isClient, setIsClient] = useState<boolean>(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const subjectRef = useRef<HTMLDivElement | null>(null);
  const descriptionRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSemesterButtonClick = (index: number) => {
    setSelectedSemesterIndex(selectedSemesterIndex === index ? null : index);
    handleSemesterClick(index);
    if (isClient) {
      setTimeout(() => {
        subjectRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  const handleSubjectButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
    setSelectedSubjectIndex(index);
    setIsOpen(true);
    handleSubjectClick(index);
    if (isClient) {
      setTimeout(() => {
        descriptionRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedSubjectIndex(null);
    if (isClient) {
      setTimeout(() => {
        subjectRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  return (
    <div ref={scrollRef} data-scroll-container className="relative p-5">
      <div className={`w-full ${isOpen ? "blur-md" : ""}`} suppressHydrationWarning={true}>
        <h1 className="text-4xl font-bold font-newLuck text-center">Semesters</h1>
        <div className="sm:grid-cols-2 custom-lg:grid-cols-4 gap-4 grid grid-cols-1 mt-5 custom-md:grid-cols-4 custom-nmd:grid-cols-2">
          {semesters.map((semester, index) => (
            <button 
              key={index} 
              onClick={() => handleSemesterButtonClick(index)}  
              className="p-2 dark:bg-eclipse bg-newEclipse bg-cover bg-transparent shadow-lg text-3xl rounded-lg 
              font-newLuck text-white cursor-pointer text-center h-36 w-25 font-bold backdrop-blur-md"
            >
              <h3>{semester.name}</h3> 
            </button>
          ))}
        </div>
        <div ref={subjectRef}>
          {selectedSemesterIndex !== null && (
            <h2 className="text-center my-5 text-3xl font-bold font-newLuck">
              {semesters[selectedSemesterIndex].name}
            </h2>
          )}
        </div>
        {selectedSemesterIndex !== null && (
          <div className="grid grid-cols-1 sm:grid-cols-2 custom-lg:grid-cols-4 gap-4 mt-5">
            {semesters[selectedSemesterIndex].subjects.map((subject, subjectIndex) => (
              <button 
                key={subjectIndex} 
                onClick={(event) => handleSubjectButtonClick(event, subjectIndex)} 
                className="p-2 dark:bg-newEclipse bg-eclipse bg-center bg-cover rounded-lg cursor-pointer text-center h-16 w-30 font-bold font-newLuck text-lg text-white backdrop-blur-md"
              >
                <h2>{subject.name}</h2>
              </button>
            ))}
          </div>
        )}
      </div>
      {isOpen && selectedSubjectIndex !== null && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div> {/* Full-screen blur background */}
          <div
            className="fixed inset-0 flex justify-center items-center z-50"
          >
            <div className="relative bg-eclipse dark:bg-newEclipse  text-black dark:text-white p-5 text-center w-full max-w-xl mx-auto rounded-lg border-t border-gray-400 shadow-lg overflow-y-auto">
              <button onClick={closeModal} className="absolute top-2 right-2 p-2 rounded-lg cursor-pointer font-bold font-newLuck">X</button>
              <div ref={descriptionRef}>
                <h2 className="text-2xl mb-2 font-bold font-newLuck">
                  {selectedSemesterIndex !== null && selectedSubjectIndex !== null && semesters[selectedSemesterIndex].subjects[selectedSubjectIndex].name}
                </h2>
                <p className='font-bold font-newLuck'>{selectedSemesterIndex !== null && selectedSubjectIndex !== null && semesters[selectedSemesterIndex].subjects[selectedSubjectIndex].description}</p>
                <div className="mt-5">
                  {selectedSemesterIndex !== null && selectedSubjectIndex !== null && semesters[selectedSemesterIndex].subjects[selectedSubjectIndex].descriptionButtons?.map((button, index) => (
                    <button
                      key={index}
                      onClick={() => window.open(button.link, '_blank')}
                      className="block w-full max-w-xs p-2 my-1 bg-yellow-600 text-black rounded-lg cursor-pointer text-center font-newLuck mx-auto"
                    >
                      {button.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SemesterComponent;
