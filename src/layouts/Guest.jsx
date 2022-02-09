import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { Toaster } from 'react-hot-toast';

function Guest(props) {
    return (
        <div className='min-h-screen bg-gray-50'>
            <Navigation />
            <Outlet />
            <Toaster position="top-right" />
        </div>
    );
}

export default Guest;