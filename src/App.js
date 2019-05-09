import React from 'react';
import { useSpring, animated } from 'react-spring';
import logo from './logo.svg';
import Toggle from './Components/Toggle';
import './App.css';

const Application = () => {
  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });

  return (
    <animated.div className="App" style={fade}>
      <header className="App-header">
        <img src={logo} className="logo" alt="Logo" />
        <button className="menu-button">Menu</button>
      </header>
      <main>
        <Toggle />
      </main>
    </animated.div>
  );
}

export default Application;
