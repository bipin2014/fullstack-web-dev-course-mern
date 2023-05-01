import React from 'react';

export default function Footer() {
  return (
    <footer className=' flex items-center justify-around p-12 bg-slate-800 text-white'>
      <div>
        <div className='text-3xl font-bold mb-4'>Bipin YT</div>
        <button className='bg-yellow-500 text-black py-2 px-4'>
          Know More
        </button>
      </div>

      <ul>
        <li className='border-b p-2'>
          <span className='mr-6'>Website Design</span>
          <span>75</span>
        </li>
        <li className='border-b p-2'>
          <span className='mr-6'>Website Design</span>
          <span>75</span>
        </li>
        <li className='border-b p-2'>
          <span className='mr-6'>Website Design</span>
          <span>75</span>
        </li>
      </ul>
    </footer>
  );
}
