"use client";
import Button from './ui/dualBut';
import React from 'react';

const Introduction: React.FC = React.memo(() => {
  return (
    <div className="pb-20  bg-cover bg-center bg-white dark:bg-black text-black dark:text-white">
      <main className="p-20">
        <div className="p-5 rounded-lg text-center">
          <h1 className="text-yellow-400 py-20 pb-0 text-5xl font-bold font-newLuck">
            <span>Welcome to Our Site</span>
          </h1>
          <h2 className="text-green-100 py-6 pb-0 text-5xl font-newLuck font-bold mb-2">
            <span>Explore Our Features</span>
          </h2>
          <Button />
        </div>
      </main>
    </div>
  );
});

Introduction.displayName = 'Introduction';

export default Introduction;