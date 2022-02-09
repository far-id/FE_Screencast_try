import React from 'react';

function Jumbotron(props) {
    return (
        <div className='grid grid-cols-2 p-12 mb-10 -mx-12 bg-gray-700 border-b-2 border-red'>
            <div>
                <h1 className='text-3xl font-semibold text-white'>{props.title}</h1>
                <div className='text-gray-200'>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Jumbotron;