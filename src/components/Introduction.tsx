"use client"
import Button from './ui/Button';
import React from 'react';

const Introduction = () => {
    return (
        <div className="pb-20 bg-eclipse bg-cover bg-center" >
            <main className="p-20">
                <div className=" p-5 rounded-lg  text-center ">
                    <h1 className="text-yellow-400 py-20 pb-0 text-5xl font-bold font-new ">
                        <span >Welcome to Our Site
                        </span>
                        </h1>
                    <h2 className="text-green-100 py-6 pb-0 text-5xl font-bold mb-2">
                    <span>
                        Explore Our Features
                        </span>
                        </h2>
                    <Button/>
                    <p className="text-red-500 font-bold font-cursive text-4xl py-10">
                    <span className=' p-2'>Discover the amazing features we offer to enhance your study.</span></p>
                </div>
            </main>
        </div>
    );
};

export default Introduction;
