import React from 'react';
import Navbar from './Navbar';
import Body from './Body';

export default function Homepage() {
  return (
    <div className='flex w-screen h-screen flex-col mx-auto'>
      <Navbar />
      <Body />
    </div>
  );
}
