import React from 'react';

function Success(props) {
    return (
        <div>
            <div className="relative flex flex-col py-5 pl-6 pr-8 bg-white rounded-md shadow sm:flex-row sm:items-center sm:pr-6">
            <div className="flex flex-row items-center w-full pb-4 border-b sm:border-b-0 sm:w-auto sm:pb-0">
                    <div className="text-green-500">
                        <svg className="w-6 h-6 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div className="ml-3 text-sm font-medium">Success Payment.</div>
                </div>
                <div className="mt-4 text-sm tracking-wide text-gray-500 sm:mt-0 sm:ml-4">Your Payment was Successful. You can use our services!</div>
                <div className="absolute ml-auto text-gray-400 cursor-pointer sm:relative sm:top-auto sm:right-auto right-4 top-4 hover:text-gray-800">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </div>
            </div>
        </div>
    );
}

export default Success;