'use client';

import React, { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  boxShadow: 24,
  p: 4,
};

const SemesterComponent: React.FC<SemesterProps> = ({
  semesters,
  handleSemesterClick,
  handleSubjectClick,
}) => {
  const [selectedSemesterIndex, setSelectedSemesterIndex] = useState<number | null>(null);
  const [selectedSubjectIndex, setSelectedSubjectIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const subjectRef = useRef<HTMLDivElement | null>(null);
  const descriptionRef = useRef<HTMLDivElement | null>(null);

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
    setIsOpen(true); // Open the modal when a subject is selected
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

  // Toggle between dark and light mode


  return (
    <div className="relative p-5">
      

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
      
      {/* MUI Modal (Basic Modal) */}
      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ 
          ...style, 
          bgcolor: 'white', // Light mode background
          color: 'black', // Light mode text color
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          flexDirection: 'column' 
        }} className="dark:bg-black dark:text-cream dark:text-white text-black font-bold font-newLuck">
          {/* Close Button */}
          <IconButton
            onClick={closeModal}
            sx={{ position: 'absolute', top: 10, right: 10 }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>

          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center' }}>
            {selectedSemesterIndex !== null && selectedSubjectIndex !== null && semesters[selectedSemesterIndex].subjects[selectedSubjectIndex].name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'center' }}>
            {selectedSemesterIndex !== null && selectedSubjectIndex !== null && semesters[selectedSemesterIndex].subjects[selectedSubjectIndex].description}
          </Typography>
          <div className="mt-5">
            {selectedSemesterIndex !== null && selectedSubjectIndex !== null && semesters[selectedSemesterIndex].subjects[selectedSubjectIndex].descriptionButtons?.map((button, index) => (
              <Button
                key={index}
                onClick={() => window.open(button.link, '_blank')}
                variant="contained"
                color="primary"
                sx={{ mt: 2, width: '100%' }}
                className="dark:bg-eclipse dark:text-white text-black bg-newEclipse font-bold font-newLuck"
              >
                {button.title}
              </Button>

            ))}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default SemesterComponent;
