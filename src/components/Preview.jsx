import React, { useState } from 'react';
import axios from 'axios'







export const Preview = ({ setPreview, preview }) => {
    // console.log(preview);


    return (
        <div className="relative min-w-screen w-screen md:w-[600px] min-h-fit bg-white shadow-sm sm:rounded-3xl p-6 border border-blue-100">

            <div className=" mb-4 flex items-center justify-between"><p className='text-xs text-white bg-blue-400 w-fit px-2 p-1 rounded'>Owner : {preview?.createdBy}</p>
                <svg onClick={() => setPreview(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-red-500 bg-red-100 rounded-full p-1 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </div>

            <p className='text-sm sm:text-xl md:text-2xl md:font-light'>
                {preview?.name}
            </p>

            <div className='flex justify-between items-center gap-2 text-xs my-3'>

                <div className='w-fit border rounded-xl p-2 flex justify-between gap-2 items-center'>
                    <p>Created At</p>
                    <p className='text-slate-500 font-semibold'>{preview?.date.substring(0, 10)}</p>
                </div>

                <div className='w-fit border rounded-xl p-2 flex justify-between gap-2 items-center'>
                    <p>Updated At</p>
                    <p className='text-slate-500 font-semibold text-xs'>{preview?.updatedAt.substring(0, 10)}</p>
                </div>

            </div>

            <hr />


            <div className='my-2'>
                <p className='uppercase font-semibold text-slate-500 text-xs mt-5 mb-1 ml-1'>Description</p>
                <p className='text-slate-900 text-sm ml-1 mb-5'>
                    {preview?.description}
                </p>

                <div className='flex justify-between items-center my-2'>
                    <div className='w-fit border bg-blue-50 rounded-xl p-2'>
                        <p className='text-xs'>AMOUNT</p>
                        <p className='text-blue-500 font-semibold text-xl'>$ {preview?.amount}</p>
                    </div>
                </div>

            </div>

            <p className='absolute -top-3 right-5 px-4 bg-green-100 w-fit border border-green-300 rounded-full'>
                {preview?.category}
            </p>

        </div>
    );
};

