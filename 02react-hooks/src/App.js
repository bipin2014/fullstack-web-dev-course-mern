import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [name, setName] = useState('Learn React');

  const buttonCLick=()=>{
    setName('Learn to change Name')
  }
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button
          className='App-link'
          onClick={buttonCLick}
        >
          {name}
        </button>
      </header>
    </div>
  );
}

export default App;
