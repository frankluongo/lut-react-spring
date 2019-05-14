import React, { useState} from 'react'
import { useSpring, animated } from 'react-spring';

const Checkout = ({ isOpen }) => {
  // const animationRight = useSpring({
  //   transform: isOpen ? `translate3d(0,0,0)` : `translate3d(100%,0,0)`
  // });
  // const animationLeft = useSpring({
  //   transform: isOpen ? `translate3d(0,0,0)` : `translate3d(-100%,0,0)`
  // });

  const { x } = useSpring({
    x: isOpen ? 0 : 100
  });

  return (
    <div
      className="checkout"
      style={{
        pointerEvents: isOpen ? 'all' : 'none'
      }}>
      <animated.div style={{
        transform: x.interpolate(x => `translate3d(-${x}%,0,0)`)
      }} className="checkout-left" />
      <animated.div style={{
        transform: x.interpolate(x => `translate3d(${x}%,0,0)`)
      }} className="checkout-right" />
    </div>
  )
}

export default Checkout
