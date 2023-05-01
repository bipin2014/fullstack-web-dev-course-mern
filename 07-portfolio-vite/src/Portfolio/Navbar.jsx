import React from 'react';

export default function Navbar() {
  const list = ['Home', 'Works', 'About', 'Projects', 'Services'];
  return (
    <nav className='flex container mx-auto items-center justify-between border-b-2 p-3'>
      <div className='text-xl font-bold '>BB YT .</div>
      <div className='flex'>
        {list.map((item) => (
          <div className='m-1 p-2' key={item}>
            {item}
          </div>
        ))}
      </div>

      <button className='border-2 px-4 py-2 border-black'>Let's Chat</button>
    </nav>
  );
}
