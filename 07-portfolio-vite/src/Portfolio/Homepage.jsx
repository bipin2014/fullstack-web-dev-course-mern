import React from 'react';
import Navbar from './Navbar';

import { Outlet } from 'react-router-dom';

export default function Homepage() {
  return (
    <div className='flex w-screen h-screen flex-col mx-auto'>
      <Navbar />
      <Outlet />
    </div>
  );
}
