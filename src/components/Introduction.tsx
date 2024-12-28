"use client";
import React, { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import Button from './ui/dualBut';
import TypingAnimation from "../components/ui/typing-animation";

const Introduction: React.FC = React.memo(() => {
  const scrollRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={scrollRef} data-scroll-container id='introduction' className="pb-20 dark:bg-background bg-cover bg-center bg-white dark:bg-black text-black dark:text-white">
      <main className="p-20">
        <div className="p-5 rounded-lg text-center" data-scroll-section>
          <h1 className="dark:text-yellow-400 text-black py-20 pb-0 text-5xl font-bold font-newLuck">
            <TypingAnimation>Welcome to KoolNotes</TypingAnimation>
          </h1>
          <h2 className="dark:text-green-100 text-blue-600 py-6 pb-0 text-4xl font-newLuck font-bold mb-2">
            <span>Access study notes, past papers, AI summaries, and chat support for all subjects and semesters. We&apos;re continuously expanding with new colleges and materials.
            </span>
          </h2>
          <h4 className='dark:text-white text-pink-700 text-3xl font-newGab'>Start acing your exams today!</h4>
          <Button />
        </div>
      </main>
    </div>
  );
});

Introduction.displayName = 'Introduction';

export default Introduction;
