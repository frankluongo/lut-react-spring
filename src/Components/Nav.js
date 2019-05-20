import React from 'react'
import { animated } from 'react-spring';

const Nav = ({ style }) => {
  return (
    <animated.div className="nav-wrapper" style={style}>
      <nav>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
      </nav>
    </animated.div>
  )
}

export default Nav;
