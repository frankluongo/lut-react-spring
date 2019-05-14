import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';


const Toggle = () => {
  const [isToggled, setToggle] = useState(false);
  const AnimatedTitle = animated.h1;
  /*const fade = useSpring({
    // opacity: isToggled ? 1 : 0,
    color: isToggled ? '#000' : 'rgba(255,255,255,0.5)',
    fontSize: isToggled ? '1rem' : '3em',
    // transform: isToggled ? 'translate3d(0,0,0)' : 'translate3d(0, -50px, 0)',
    y: isToggled ? 0 : -50
  });*/

  const { color, y } = useSpring({
    // opacity: isToggled ? 1 : 0,
    color: isToggled ? '#000' : 'rgba(255,255,255,0.5)',
    fontSize: isToggled ? '1rem' : '3em',
    // transform: isToggled ? 'translate3d(0,0,0)' : 'translate3d(0, -50px, 0)',
    y: isToggled ? 0 : 1
  });

  return (
    <div>
      <AnimatedTitle style={{
        transform: y.interpolate({
          range: [0, 0.25, 0.50, 0.75, 1],
          output: [0, -25, -50. -100, -50]
        }).interpolate(y => `translate3d(0,${y}px,0)`),
        color
        }}>Hello</AnimatedTitle>
      <button onClick={() => setToggle(!isToggled)}>Toggle</button>
    </div>
  )
}

/*<AnimatedTitle style={{
  transform: `translate3d(0,${fade.y},0)`,
  ...fade
  }}>Hello</AnimatedTitle>*/

export default Toggle;

/*

import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';


const Toggle = () => {
  const [isToggled, setToggle] = useState(false);
  const transition = useTransition(isToggled, null, {
    from: { opacity: 0, position: 'absolute' },
    enter: { opacity: 1},
    leave: { opacity: 0}
  });

  return (
    <div style={{
      position: 'relative'
    }}>
      {transition.map(({ item, key, props }) => (
        item ? (
          <animated.h1 key={key} style={props}>Hello</animated.h1>
          ) : (
            <animated.h1 key={key} style={props}>World</animated.h1>
          )
      ))}
      <button onClick={() => setToggle(!isToggled)}>Toggle</button>
    </div>
  )
}

export default Toggle;


*/
