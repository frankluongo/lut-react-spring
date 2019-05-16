import React, { useState } from 'react'
import { animated, useSpring } from 'react-spring';
import useMeasure from '../Hooks/useMeasure';

const Accordion = () => {
  const [on, toggle] = useState(false);
  const [bind, {height: accordHeight, top}] = useMeasure();

  const spring = useSpring({
    overflow: 'hidden',
    height: on ? accordionDimensions() : 0,
  });

  function accordionDimensions () {
    return accordHeight + top * 2;
  }

  function toggleAccordion () {
    toggle(!on);
  }


  return (
    <div>
       <button onClick={toggleAccordion}>Toggle</button>
       <animated.div style={spring}>
        <div {...bind} className="accordion">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae qui iusto officia dignissimos excepturi cumque unde sit suscipit, eveniet, eos assumenda non quas. Minus nobis repellendus qui, earum hic dolorum!</p>
        </div>
       </animated.div>
    </div>
  )
}

export default Accordion
