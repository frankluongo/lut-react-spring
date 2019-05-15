import React, { useState }  from 'react'
import { animated, useTransition } from 'react-spring'


const Modal = ({closeModal, animation, pointerEvents}) => {
  return (
    <div className="modal" style={{ pointerEvents }}>
      <animated.div className="modal-card" style={animation}>
        <h1>Hi</h1>
        <button onClick={closeModal}>Close</button>
      </animated.div>
    </div>
  )
}

const ModalWrapper = () => {
  const [ on, toggle ] = useState(false);
  const transition = useTransition(on, null, {
      from: {opacity: 0, transform: 'translate3d(0, -40px, 0)'},
      enter: {opacity: 1, transform: 'translate3d(0, 0, 0)'},
      leave: {opacity: 0, transform: 'translate3d(0, -40px, 0)'},
    }
  );
  const pointerEvents = on ? 'all' : 'none';

  function toggleOn () {
    toggle(true)
  }

  function toggleOff () {
    toggle(false)
  }

  return (
    <div>
      {
        transition.map(({ item, props }) => item && <Modal pointerEvents={pointerEvents} animation={props} closeModal={toggleOff} />)
      }
      <button onClick={toggleOn}>Open</button>
    </div>
  )
}

export default ModalWrapper
