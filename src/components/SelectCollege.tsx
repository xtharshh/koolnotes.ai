"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import College from '../components/College';
import Branch from '../components/Branch';
import SemesterComponent from '../components/Semester';

interface Subject {
  name: string;
  description: string;
  descriptionButtons: { title: string; link: string }[];
}

interface CollegeSemester {
  name: string;
  subjects: Subject[];
}

interface Branch {
  _id: string;
  title: string;
  semesters: CollegeSemester[];
}

interface College {
  _id: string;
  name: string;
  branches: Branch[];
}

const SellectCollege = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [selectedCollegeIndex, setSelectedCollegeIndex] = useState<number | null>(null);
  const [selectedBranchIndex, setSelectedBranchIndex] = useState<number | null>(null);
  const [selectedSemesterIndex, setSelectedSemesterIndex] = useState<number | null>(null);
  const [selectedSubjectIndex, setSelectedSubjectIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  const handleCollegeClick = (event: { target: { value: string; }; }) => {
    const index = parseInt(event.target.value, 10);
    setSelectedCollegeIndex(index);
    setSelectedBranchIndex(null);
    setSelectedSemesterIndex(null);
    setSelectedSubjectIndex(null);
  };

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get(`${process.env.DOMAIN!}/api/colleges`);
        setColleges(response.data.colleges);
      } catch (error) {
        console.error('Error fetching colleges:', error);
      }
    };

    fetchColleges();
  }, []);

  const handleBranchClick = (collegeIndex: number | null, branchIndex: number | null) => {
    if (selectedBranchIndex === branchIndex) {
      setSelectedBranchIndex(null);
    } else {
      setSelectedBranchIndex(branchIndex);
    }
    setSelectedSemesterIndex(null);
    setSelectedSubjectIndex(null);
  };

  const handleSemesterClick = (semesterIndex: number | null) => {
    if (selectedSemesterIndex === semesterIndex) {
      setSelectedSemesterIndex(null);
    } else {
      setSelectedSemesterIndex(semesterIndex);
    }
    setSelectedSubjectIndex(null);
  };

  const handleSubjectClick = (subjectIndex: number | null) => {
    // if (!isLoggedIn) {
    //   // Trigger Google login
    //   return;
    // }
    setSelectedSubjectIndex(subjectIndex);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedSubjectIndex(null);
  };

  return (
    <div className="p-5 text-white text-center backdrop-blur-2xl">
      <College 
        colleges={colleges} 
        selectedCollegeIndex={selectedCollegeIndex} 
        handleCollegeClick={handleCollegeClick} 
      />
      {selectedCollegeIndex !== null && colleges[selectedCollegeIndex] && (
        <div>
          <Branch 
            branches={colleges[selectedCollegeIndex].branches} 
            selectedCollegeIndex={selectedCollegeIndex} 
            selectedBranchIndex={selectedBranchIndex} 
            handleBranchClick={handleBranchClick} 
          />
          <h2 className="mt-2 text-lg dark:text-white text-black">{colleges[selectedCollegeIndex].name}</h2>
        </div>
      )}
      {selectedBranchIndex !== null && selectedCollegeIndex !== null && colleges[selectedCollegeIndex]?.branches[selectedBranchIndex] && (
        <SemesterComponent 
          semesters={colleges[selectedCollegeIndex].branches[selectedBranchIndex].semesters} 
          selectedBranchIndex={selectedBranchIndex} 
          handleSemesterClick={handleSemesterClick} 
          handleSubjectClick={handleSubjectClick} 
        />
      )}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 dark:bg-black bg-white bg-opacity-90">
          <div className="relative dark:bg-black bg-white text-white rounded-lg p-5 w-11/12 h-4/5 overflow-auto">
            <button onClick={closeModal} className="absolute top-2 right-2 p-2 dark:bg-black bg-white text-white rounded-lg cursor-pointer">X</button>
            <h2 className="text-2xl mb-2">
              {selectedCollegeIndex !== null && selectedBranchIndex !== null && selectedSemesterIndex !== null && selectedSubjectIndex !== null &&
                colleges[selectedCollegeIndex]?.branches[selectedBranchIndex]?.semesters[selectedSemesterIndex]?.subjects[selectedSubjectIndex]?.name}
            </h2>
            <div className="mt-5">
              {selectedCollegeIndex !== null && selectedBranchIndex !== null && selectedSemesterIndex !== null && selectedSubjectIndex !== null &&
                colleges[selectedCollegeIndex]?.branches[selectedBranchIndex]?.semesters[selectedSemesterIndex]?.subjects[selectedSubjectIndex]?.descriptionButtons?.map((button, index) => (
                <button
                  key={index}
                  onClick={() => window.open(button.link, '_blank')}
                  className="block w-full p-2 my-1 bg-orange-600 text-white rounded-lg cursor-pointer text-left"
                >
                  {button.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellectCollege;
