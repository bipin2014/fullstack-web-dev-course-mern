import React from 'react';

export default function Square({ value, squareClicked }) {
  return (
    <button className='square' onClick={squareClicked}>
      {value}
    </button>
  );
}
