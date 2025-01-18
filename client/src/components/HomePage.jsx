import React from 'react';

const HomePage = () => {
    return (
        <div className=' max-w-[700px]'>
          <div className='bg-black border-l-purple-600 border-4 max-w-[500px]'>
            <h1 className=' text-white font-bold text-2xl'>Welcome to 
           <span className='text-4xl text-amber-400'> Mess Management Web Application</span></h1>
          </div>
          <div className='grid grid-cols-2 max-w-[500px] gap-1'>
          <div className='bg-orange-100 border-double border-4 border-indigo-600 ...'>
           <h1 className='text-xl font-medium text-black'><span className='text-3xl font-semibold text-amber-800'>A</span>n application that aims to digitalize the mess management system and helps make the job easier for students.</h1>
           </div>
           <div className='bg-orange-100 border-double border-4 border-indigo-600 ...'>
           <h1  className='text-xl font-medium text-black'><span className='text-3xl font-semibold text-amber-800'>T</span>his is destination for all your mess needs</h1>
           <h1>hello</h1>
           </div>
          </div>
        </div>
    );
};

export default HomePage;