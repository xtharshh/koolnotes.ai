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
  // const [isOpen, setIsOpen] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  const handleCollegeClick = (event: { target: { value: string } }) => {
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
    // setIsOpen(true);
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
      {selectedSemesterIndex !== null && selectedCollegeIndex !== null && selectedBranchIndex !== null && selectedSubjectIndex !== null && (
        <div>
          <h3>{colleges[selectedCollegeIndex].branches[selectedBranchIndex].semesters[selectedSemesterIndex].subjects[selectedSubjectIndex].name}</h3>
          <p>{colleges[selectedCollegeIndex].branches[selectedBranchIndex].semesters[selectedSemesterIndex].subjects[selectedSubjectIndex].description}</p>
          {colleges[selectedCollegeIndex].branches[selectedBranchIndex].semesters[selectedSemesterIndex].subjects[selectedSubjectIndex].descriptionButtons.map((button, index) => (
            <a key={index} href={button.link} target="_blank" rel="noopener noreferrer">
              {button.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellectCollege;
