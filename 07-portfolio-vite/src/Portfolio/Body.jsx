import React from 'react';
import img from '../assets/Thumbnail.png';
import Footer from './Footer';

export default function Body() {
  return (
    <main className='flex flex-1'>
      <div className='flex-1 flex flex-col'>
        <div className='flex-1 py-10 mx-auto'>
          <div className='flex items-center my-4 '>
            <div className='text-5xl font-bold mr-8'>Hi! i Am</div>
            <div className='text-3xl bg-blue-500 text-white font-bold rounded-full p-4'>
              Software Enginer
            </div>
          </div>

          <div className='text-5xl font-bold mb-8'>Bipin Budhathoki</div>
          <p className='mb-8'>
            Developing user interface for over{' '}
            <span className='font-bold'>5 years</span> as a programmer
          </p>

          <div className='flex items-center mb-8'>
            <button className='bg-orange-600 text-white py-2 px-4 mr-4'>
              Hire Me
            </button>
            <a href='#' className='font-bold'>
              Projects
            </a>
          </div>

          <div className='mb-8'>
            <div className='font-bold text-3xl mb-3'>+84</div>
            <div className='font-bold'>Clients on work worldwide</div>
          </div>

          <div className='flex justify-between'>
            <div>
              <div className='font-bold text-3xl mb-3'>572</div>
              <div className='font-bold'>Project Done</div>
            </div>

            <div>
              <div className='font-bold text-3xl mb-3'>Contact</div>
              <div className='font-bold'>bipin@quantumc.tech</div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <div className='flex-1'>
        <img className='h-full object-cover' src={img} alt='thumbnail' />
      </div>
    </main>
  );
}
