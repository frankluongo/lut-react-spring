import React, { useState, useRef } from 'react'
import { animated, useTrail, useSpring, useChain, useTransition } from 'react-spring';

const items = [0,1,2,3,4];

const Boxes = () => {
  const [on, toggle] = useState(false);

  const springRef = useRef();

  const { size } = useSpring({
    ref: springRef,
    from: { size: '20%' },
    to: { size: on ? '100%' : '20%' }
  });

  const transitionRef = useRef();

  const transition = useTransition(on ? items : [], item => item, {
      ref: transitionRef,
      trail: 100 / items.length,
      from: { opacity: 0, transform: 'scale(0)' },
      enter: { opacity: 1, transform: 'scale(1)' },
      leave: { opacity: 0, transform: 'scale(0)' }
    }
  )

  useChain(on ? [springRef, transitionRef] : [transitionRef, springRef]);

  return (
    <div className="full-height">
      <animated.div
        style={{width: size, height: size}}
        className="boxes-grid-two"
        onClick={() => {toggle(!on)}}>
        {/* <button onClick={() => {toggle(!on)}}>Toggler</button> */}
        {transition.map(({ item, key, props: animation }) => (
          <animated.div className="box-two" key={key} style={animation} />
        ))}
      </animated.div>
    </div>
  )
}

export default Boxes
