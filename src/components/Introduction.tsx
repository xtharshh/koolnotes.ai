"use client"
import Button from './ui/Button';
import React from 'react';

const Introduction = () => {
    return (
        <div className="pb-8 bg-fixed bg-center bg-cover" >
            <main className="p-20">
                <div className="bg-red-200 bg-opacity-50 p-5 rounded-lg mb-20 text-center">
                    <h1 className="dark:text-yellow-400 py-10 pb-0 text-2xl">Welcome to Our Site</h1>
                    <h2 className="dark:text-green-300 text-2xl mb-2">Explore Our Features</h2>
                    <p className="text-black dark:text-white">Discover the amazing features we offer to enhance your experience.</p>
                    <Button/>
                </div>
            </main>
        </div>
    );
};

export default Introduction;
