# Animating React with React Spring
LevelUpTutorials

## 1 Why React Spring & Physics Based Animations
[React Spring Documentation](https://www.react-spring.io/)
- Also check out popmotion

## 2 Getting Started
[Course Starter Files](https://github.com/leveluptuts/Animating-React-Starter)

## 3 A Basic Spring
```jsx
import { useSpring, animated } from 'react-spring';

const Application = () => {
  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });

  return (
    <animated.div className="App" style={fade}>
```

## 4 Toggling a Spring
```jsx
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

const Toggle = () => {
  const [isToggled, setToggle] = useState(false);
  const fade = useSpring({
    opacity: isToggled ? 1 : 0
  });

  return (
    <div>
      <animated.h1 style={fade}>Hello</animated.h1>
      <button onClick={() => setToggle(!isToggled)}>Toggle</button>
    </div>
  )
}

export default Toggle;
```

## 5 Animating Properties
```jsx
  const fade = useSpring({
    // opacity: isToggled ? 1 : 0,
    color: isToggled ? '#000' : 'rgba(255,255,255,0.5)',
    fontSize: isToggled ? '1rem' : '3em',
    transform: isToggled ? 'translate3d(0,0,0)' : 'translate3d(0, -50px, 0)'
  });
```
