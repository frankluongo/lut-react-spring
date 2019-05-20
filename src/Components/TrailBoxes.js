import React, { useState } from 'react'
import { animated, useTrail } from 'react-spring';

const items = [0,1,2,3,4];

const Boxes = () => {
  const [on, toggle] = useState(false);

  const trail = useTrail(
    items.length,
    {
      // from: { opacity: 0 },
      // to: { opacity: 1 }
      opacity: on ? 1 : 0,
      transform: on ? 'scale(1)' : 'scale(0.3)'
    }
  )

  return (
    <div className="boxes-grid">
      <button onClick={() => {toggle(!on)}}>Toggler</button>
      {trail.map(animation => <animated.div className="box" style={animation} />)}
    </div>
  )
}

export default Boxes
