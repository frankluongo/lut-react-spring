import React, {useState} from 'react';
import { useSpring, animated } from 'react-spring';
import logo from './logo.svg';
import Checkout from './Components/Checkout'
import Modal from './Components/Modal'
import Accordion from './Components/Accordion';
// import Box from './Components/Box';
// import Boxes from './Components/Boxes';
import TrailBoxes from './Components/TrailBoxes';


import './App.css';

const Application = () => {
  const [ isNavOpen, setNavOpen ] = useState(false);
  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });

  return (
    <animated.div className="App" style={fade}>
      <header className="App-header">
        <img src={logo} className="logo" alt="Logo" />
        <button
          onClick={() => setNavOpen(!isNavOpen)}
          className="menu-button">{
            isNavOpen ? 'Close' : 'Menu'
          }</button>
      </header>
      <main>
        <Checkout
          isOpen={isNavOpen}
        />
        <Modal />
        <Accordion />
        {/* <Box /> */}
        <TrailBoxes />
      </main>
    </animated.div>
  );
}

export default Application;
