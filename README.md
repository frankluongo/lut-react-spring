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


## 13: Modals
```jsx
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
```


### 14: Configuration Options
[Common API](https://www.react-spring.io/docs/hooks/api)

```jsx
import React from 'react'
import { useSpring, animated, config } from 'react-spring';

const Checkout = ({ isOpen }) => {
  const { x } = useSpring({
    x: isOpen ? 0 : 100,
    config: config.molasses
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

/*
    config: {
      tension: 500,
      friction: 1,
    }
*/
```


## 15: Animating Height Auto

```jsx
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

```


## 16: Animation on Scroll
```jsx
import React, { useState } from 'react'
import { animated, useSpring } from 'react-spring'
import { Waypoint } from 'react-waypoint';


const Waypoints = () => {
  const [ on, toggle ] = useState(false);
  const animation = useSpring({
    opacity: (on ? 1 : 0),
    transform: (on ? 'translate3d(0,0,0)' : 'translate3d(-50%,0,0)'),
  });


  return (
    <div className="waypoints">
      <p>
        Lorem ipsum dolor amet poutine pitchfork tattooed venmo, heirloom cliche chartreuse gentrify mumblecore hammock single-origin coffee banh mi. Sartorial unicorn 90's edison bulb iPhone. Leggings pickled brunch neutra tousled. Occupy fixie affogato pinterest vaporware aesthetic, tbh subway tile hammock next level prism vape lomo taiyaki kale chips. Jianbing knausgaard taxidermy squid artisan thundercats, gochujang subway tile air plant taiyaki master cleanse cray.
      </p>
      <p>
        Pug godard pour-over 90's direct trade, PBR&B +1 next level organic edison bulb quinoa DIY. Taiyaki sriracha unicorn, cronut taxidermy chicharrones four dollar toast keytar cold-pressed raclette yuccie cray iceland. Roof party knausgaard neutra plaid, pork belly chambray banh mi chia. Blue bottle narwhal iceland health goth cornhole fam humblebrag flannel pitchfork pickled.
      </p>
      <p>
        Jianbing lomo lumbersexual put a bird on it fixie next level pitchfork gentrify, disrupt echo park. Hot chicken subway tile drinking vinegar fixie. YOLO keytar gluten-free artisan live-edge four loko cred man braid food truck leggings. Health goth semiotics kogi heirloom authentic hell of. Pork belly helvetica cornhole gentrify microdosing austin chillwave pitchfork paleo cred raclette venmo vegan fashion axe +1.
      </p>
      <p>
        Craft beer tousled ennui ugh, williamsburg stumptown flexitarian plaid activated charcoal. Taxidermy letterpress glossier 8-bit, organic bitters coloring book. Selvage lo-fi typewriter wolf ugh, lyft four loko chillwave bitters mustache tumblr copper mug subway tile. Fanny pack aesthetic taiyaki vice sustainable mustache. Asymmetrical shabby chic DIY authentic normcore man braid you probably haven't heard of them. Mustache humblebrag umami beard williamsburg. Prism hexagon VHS, paleo tacos narwhal etsy fashion axe ennui schlitz ethical echo park vinyl.
      </p>
      <div>
        <Waypoint
          bottomOffset="30%"
          onEnter={() => toggle(true)}
          onLeave={() => toggle(false)}
        />
      <animated.p style={animation}>
        Health goth af scenester irony, farm-to-table austin intelligentsia man bun celiac flexitarian yuccie marfa kickstarter banh mi gluten-free. Pabst vape bespoke banjo umami next level tumblr offal wolf kombucha. Jean shorts direct trade distillery yr glossier dreamcatcher, before they sold out butcher. Fixie unicorn leggings pabst forage neutra. 3 wolf moon microdosing food truck hell of keytar, bitters disrupt flannel chartreuse knausgaard affogato ethical pickled. Humblebrag small batch meh glossier mixtape.
      </animated.p>
      </div>
    </div>
  )
}

export default Waypoints
```


## 17: Set Function and Gestures
```jsx
import React from 'react'
import { useGesture } from 'react-with-gesture'
import { animated, useSpring } from 'react-spring'



const Box = () => {
  const [{xy}, set] = useSpring(() => ({
      xy: [0, 0]
    }));

  const bind = useGesture ( ({ down, delta }) => {
    set({ xy: down ? delta : [0,0] });
  })

  return (
    <animated.div
      style={{
        transform: xy.interpolate((x,y) => `translate3d(${x}px, ${y}px, 0)`)
      }}
      {...bind()}
      className="box" />
  )
}

export default Box
```


## 18: Gestures With Events
```jsx
import React from 'react'
import { useGesture } from 'react-with-gesture'
import { animated, useSpring } from 'react-spring'



const Box = () => {
  const [{x}, set] = useSpring(() => ({
      x: 0
    }));

  const bind = useGesture ( ({ down, delta }) => {

    if (down) {
      set({ x: down ? delta[0] : 0});
    } else {
      if (delta[0] > 400) {
        set({ x: 500})
      } else {
        set({ x: 0})
      }
    }

  })

  return (
    <animated.div
      style={{
        opacity: x.interpolate({
          map: Math.abs,
          range: [0, 400],
          output: [1, 0.5]}
        ),
        transform: x.interpolate((x) => `translate3d(${x}px, 0, 0)`)
      }}
      {...bind()}
      className="box" />
  )
}

export default Box
```


## 19: UseSprings
```jsx
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
```
