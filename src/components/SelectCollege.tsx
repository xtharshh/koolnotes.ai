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
  const [filteredColleges, setFilteredColleges] = useState<College[]>([]);
  const [selectedCollegeIndex, setSelectedCollegeIndex] = useState<number | null>(null);
  const [selectedBranchIndex, setSelectedBranchIndex] = useState<number | null>(null);
  const [selectedSemesterIndex, setSelectedSemesterIndex] = useState<number | null>(null);
  const [selectedSubjectIndex, setSelectedSubjectIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleCollegeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(event.target.value, 10);
    setSelectedCollegeIndex(index);
    setSelectedBranchIndex(null);
    setSelectedSemesterIndex(null);
    setSelectedSubjectIndex(null);
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
      setSelectedSubjectIndex(null);
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
    setSelectedSubjectIndex(subjectIndex);
  };

  return (
    <div className="p-5 dark:text-white text-black text-center backdrop-blur-2xl ">
      
        <College
          colleges={filteredColleges}
          selectedCollegeIndex={selectedCollegeIndex}
          handleCollegeClick={handleCollegeSelect}
        />
      <div className="flex justify-center mb-4"> 
        <input type="text" placeholder="Search..." className="border p-2 rounded-l mt-4" onChange={handleSearchChange}
        onKeyPress={handleSearchKeyPress} value={searchTerm}/>
        <button className="bg-yellow-500 p-2 rounded-r mt-4">🔍</button> 
      </div>
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
