"use client"

import { useState, useEffect } from 'react'
import axios from 'axios'
// ...existing imports...

const SelectCollege = () => {
  // ...existing state...

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/colleges');
        console.log('Fetched colleges:', response.data); // Debug log
        
        if (response.data && response.data.colleges) {
          setColleges(response.data.colleges);
          setFilteredColleges(response.data.colleges);
        }
      } catch (error) {
        console.error('Error fetching colleges:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchColleges();
  }, []);

  const handleCollegeSelect = (value: string) => {
    console.log('Selected college index:', value); // Debug log
    const index = parseInt(value, 10);
    setSelectedCollegeIndex(index);
    // ...rest of the handler
  };

  return (
    <div className="p-5 ml-6 mr-6 pb-16 rounded-2xl mb-16 mt-8 text-center backdrop-blur-2xl bg-white dark:bg-black text-black dark:text-white border border-gray-300 dark:border-customBeige">
      {isLoading ? (
        <div>Loading colleges...</div>
      ) : (
        <div id="select-college-section" ref={collegeRef}>
          <College
            colleges={filteredColleges}
            selectedCollegeIndex={selectedCollegeIndex}
            handleCollegeClick={handleCollegeSelect}
          />
          <pre className="text-xs mt-2 text-gray-500">
            {`Debug: ${filteredColleges.length} colleges loaded`}
          </pre>
        </div>
      )}
      {/* ...rest of the JSX */}
    </div>
  );
};
