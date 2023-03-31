import React from 'react';
import './Hello.css'

const Hello = () => {
  const country = {
    name: 'Nepal',
    description:
      'Nepal is a beautiful country where buddha was born and has Mt everest',
  };
  return (
    <div className='background'>
      <h1 className='heading'>Hello {country.name}</h1>
      <div className='description'>{country.description}</div>
    </div>
  );
};

export default Hello;
