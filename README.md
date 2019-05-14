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


## 11: Transition With Multiple Components
```jsx
const Toggle = () => {
  const [items, setItems] = useState([
    {letter: "S",key: 1 },
    {letter: "c",key: 2},
    {letter: "o",key: 3},
    {letter: "t",key: 4},
    {letter: "t",key: 5},
  ]);
  const transition = useTransition(items, item => item.key, {
    from: { opacity: 0 },
    enter: { opacity: 1},
    leave: { opacity: 0}
  });

  return (
    <div>
      {transition.map(({ item, key, props }) => (
        <animated.h1 key={key} style={props}>
          {item.letter}
        </animated.h1>
      ))}
      <button onClick={() => setItems([
        {
          letter: "S",
          key: 1
        }
      ])}>Toggle</button>
    </div>
  )
}
```


## 12: Transition With React Router
```jsx
import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, __RouterContext } from 'react-router-dom';
import { animated, useTransition } from 'react-spring';


function useRouter() {
  return useContext(__RouterContext);
}

const Routes = () => {
  return (
    <Router>
      <ul className="router-nav">
        <NavLink to="/">One</NavLink>
        <NavLink to="/two">Two</NavLink>
        <NavLink to="/three">Three</NavLink>
      </ul>

      <Main />
    </Router>
  );
};


const Main = () => {
  const { location } = useRouter();

  const transitions = useTransition(location, location => location.key, {
    from: { opacity: 0, position: 'absolute', width: '100%', transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0,0,0)'},
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  });

  return transitions.map(({ item, props: transition, key }) => (
    <animated.div key={key} style={transition}>
      <Switch location={item}>
        <Route exact path="/" component={One} />
        <Route exact path="/two" component={Two} />
        <Route exact path="/three" component={Three} />
      </Switch>
    </animated.div>
  ));
}


function NavLink(props) {
  return (
    <li>
      <Link {...props} />
    </li>
  );
}

const One = () => {
  return (
    <div className="page-route">
      <h1>One</h1>
    </div>
  );
};
const Two = () => {
  return (
    <div className="page-route two">
      <h1>Two</h1>
    </div>
  );
};
const Three = () => {
  return (
    <div className="page-route three">
      <h1>Three</h1>
    </div>
  );
};

export default Routes;
```
