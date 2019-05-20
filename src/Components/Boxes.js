import React from 'react'
import { animated, useSprings } from 'react-spring';

const items = [0,1,2,3,4];

const Boxes = () => {
  const springs = useSprings(
    items.length,
    items.map(
      item => ({
        from: {opacity: 0},
        to: {opacity: 1}
      }))
  )

  return (
    <div className="boxes-grid">
      {springs.map(animation => <animated.div className="box" style={animation} />)}
    </div>
  )
}

export default Boxes
