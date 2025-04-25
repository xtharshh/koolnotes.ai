"use client";

import { useState, useEffect, useRef } from 'react';
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
  const [filteredColleges, setFilteredColleges] = useState<College[]>([]);
  const [selectedCollegeIndex, setSelectedCollegeIndex] = useState<number | null>(null);
  const [selectedBranchIndex, setSelectedBranchIndex] = useState<number | null>(null);
  const [selectedSemesterIndex, setSelectedSemesterIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [branchClicked, setBranchClicked] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  const collegeRef = useRef<HTMLDivElement | null>(null);
  const branchRef = useRef<HTMLDivElement | null>(null);
  const semesterRef = useRef<HTMLDivElement | null>(null);
  const subjectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCollegeSelect = (value: string) => {
    const index = parseInt(value, 10);
    setSelectedCollegeIndex(index);
    setSelectedBranchIndex(null);
    setSelectedSemesterIndex(null);
    setBranchClicked(false);
    if (isClient) {
      setTimeout(() => {
        branchRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filtered = colleges.filter(college =>
      college.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredColleges(filtered);
  };

  const handleSearchKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && filteredColleges.length > 0) {
      const index = colleges.findIndex(college => college._id === filteredColleges[0]._id);
      setSelectedCollegeIndex(index);
      setSelectedBranchIndex(null);
      setSelectedSemesterIndex(null);
      setBranchClicked(false);
      if (isClient) {
        setTimeout(() => {
          branchRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  };

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get('/api/colleges', {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY // Read API key from environment variable
          }
        });

        setColleges(response.data.colleges || []);
        setFilteredColleges(response.data.colleges || []);
      } catch (error) {
        console.error('Error fetching colleges:', error);
      }
    };

    fetchColleges();
  }, []);

  const handleBranchClick = (collegeIndex: number | null, branchIndex: number | null) => {
    if (selectedBranchIndex === branchIndex) {
      setSelectedBranchIndex(null);
      setBranchClicked(false);
    } else {
      setSelectedBranchIndex(branchIndex);
      setBranchClicked(true);
      if (isClient) {
        setTimeout(() => {
          semesterRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
    setSelectedSemesterIndex(null);
  };

  const handleSemesterClick = (semesterIndex: number | null) => {
    if (selectedSemesterIndex === semesterIndex) {
      setSelectedSemesterIndex(null);
    } else {
      setSelectedSemesterIndex(semesterIndex);
      if (isClient) {
        setTimeout(() => {
          subjectRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  };

  const handleSubjectClick = (subjectIndex: number | null) => {
    setSelectedSemesterIndex(subjectIndex);
  };

  return (
    <div className="w-full min-h-screen">
      <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 
        backdrop-blur-2xl bg-white dark:bg-black text-black dark:text-white 
        border-x border-t border-gray-300 dark:border-gray-800">
        <div id="select-college-section" ref={collegeRef}>
          <College
            colleges={filteredColleges}
            selectedCollegeIndex={selectedCollegeIndex}
            handleCollegeClick={handleCollegeSelect}
          />
        </div>
        <div className="flex justify-center mb-4 ">
          <input
            type="text"
            placeholder="Search..."
            className="border p-2 rounded-l mt-4 bg-white dark:bg-black dark:text-white text-black "
            onChange={handleSearchChange}
            onKeyPress={handleSearchKeyPress}
            value={searchTerm}
          />
        </div>
        {selectedCollegeIndex !== null && colleges[selectedCollegeIndex] && (
          <div ref={branchRef}>
            <Branch
              branches={colleges[selectedCollegeIndex].branches}
              selectedCollegeIndex={selectedCollegeIndex}
              selectedBranchIndex={selectedBranchIndex}
              handleBranchClick={handleBranchClick}
            />
            <div className='border-red p-6'>
              <h2 className="mt-2 text-4xl text-blue-700 font-newLuck-extrabold">{colleges[selectedCollegeIndex].name}</h2>
              {!branchClicked && (
                <h3 className="mt-2 text-3xl cursor-pointer" onClick={() => setBranchClicked(true)}>
                  Select Branch
                </h3>
              )}
              <div ref={semesterRef}>
                {branchClicked && selectedBranchIndex !== null && (
                  <h3 className="mt-2 text-2xl cursor-pointer" onClick={() => setBranchClicked(false)}>
                    Branch Selected: <span className='font-semibold text-blue-700'>{colleges[selectedCollegeIndex].branches[selectedBranchIndex].title}</span>
                  </h3>
                )}
              </div>
            </div>
          </div>
        )}
        {selectedBranchIndex !== null && selectedCollegeIndex !== null && colleges[selectedCollegeIndex]?.branches[selectedBranchIndex] && (
          <SemesterComponent
            semesters={colleges[selectedCollegeIndex].branches[selectedBranchIndex].semesters}
            handleSemesterClick={handleSemesterClick}
            handleSubjectClick={handleSubjectClick}
          />
        )}
      </div>
    </div>
  );
};

export default SellectCollege;
