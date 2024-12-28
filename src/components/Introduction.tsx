"use client";
import Button from './ui/dualBut';
import React from 'react';

const Introduction: React.FC = React.memo(() => {
  return (
    <div id='introduction' className="pb-20  dark:bg-background bg-cover bg-center bg-white dark:bg-black text-black dark:text-white">
      <main className="p-20">
        <div className="p-5 rounded-lg text-center">
          <h1 className="dark:text-yellow-400 text-black py-20 pb-0 text-5xl font-bold font-newLuck">
            <a className='koolnotes'>KoolNotes</a>
          </h1>
          <h2 className="dark:text-green-100 text-blue-600 py-6 pb-0 text-4xl font-newLuck font-bold mb-2">
            <span>Access study notes, past papers, AI summaries, and chat support for all subjects and semesters. We&apos;re continuously expanding with new colleges and materials.
            </span>
          </h2>
            <h4 className='dark:text-white text-pink-700 text-3xl font-newGab'>Start acing your exams today!</h4>
          <Button />
        </div>
      </main>
    </div>
  );
});

Introduction.displayName = 'Introduction';

export default Introduction;