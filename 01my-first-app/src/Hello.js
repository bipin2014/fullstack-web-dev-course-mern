import React from 'react';
import './Hello.css';

const Hello = () => {
  let country = {
    name: 'Nepal',
    description:
      'Nepal is a beautiful country where buddha was born and has Mt everest',
  };
  const buttonClick=()=>{
    console.log(country);
    country={
      ...country,
      name:'USA'
    }
    console.log(country);
  }
  
  return (
    <div className='background'>
      <h1 className='heading'>Hello {country.name}</h1>
      <div className='description'>{country.description}</div>
      <button
        style={{
          padding: '10px',
          background: 'blue',
          color: 'white',
          fontSize: '1rem',
        }}
        onClick={buttonClick}
      >
        Learn more
      </button>
    </div>
  );
};

export default Hello;
