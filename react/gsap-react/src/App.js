import logo from './logo.svg';
import './App.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef, useState } from 'react';
import CompFirst from './component/Comp1';
import CompSecond from './component/Comp2';
import Example from './component/Example';

function App() {

  gsap.registerPlugin(useGSAP);
  const container = useRef();

  const [position , setPosition] = useState(0)

  // console.log("container" , container.current)

  // useGSAP(() => {
  //   console.log("position" , position)
  //   gsap.to('.box', { x: position, delay: 1, duration: 2 });
  // },{scope: container, dependencies: [position], revertOnUpdate: false});

  useGSAP(() => {
    // gsap.to("#box1" , {
    //   x: 800,
    //   duration: 2,
    //   delay: 1
    // })
    // gsap.from("#box2" , {
    //   x: 800,
    //   duration: 2,
    //   delay: 1,
    //   backgroundColor: "blue",
    // })

    // gsap.from("h1",{
    //   y: 30,
    //   duration: 1,
    //   delay: 1,
    //   opacity: 0,
    //   stagger: 0.3
    // })

    // gsap.to("#box1" , {
    //   x: 800,
    //   duration: 2,
    //   delay: 1
    // })

    // gsap.to("#box2" , {
    //   x: 800,
    //   duration: 2,
    //   delay: 3
    // })

    // gsap.to("#box3" , {
    //   x: 800,
    //   duration: 2,
    //   delay: 5
    // })

    const tl = gsap.timeline();

    tl.from(".logo", {
      y:-30,
      duration: 1,
      opacity: 0,
      delay:1
    });

    tl.from("nav li", {
      y:-30,
      duration: 1,
      opacity: 0,
      stagger: 0.5
    })

    // tl.to("nav li", {
    //   y:30,
    //   duration: 1,
    //   opacity: 0,
    //   stagger: 0.5,
    //   delay: 1
    // })

    // tl.to("#box1" , {
    //   x: 800,
    //   duration: 2,
    //   delay: 1
    // })

    // tl.to("#box2" , {
    //   x: 800,
    //   duration: 2
    // })

    // tl.to("#box3" , {
    //   x: 800,
    //   duration: 2
    // })

  })

  const getRandomNumber = () => {
    let randomNumber = Math.random();
    let newRandom = randomNumber * 800;
    return Math.floor(newRandom);
  }

  return (
    // <div className="App">

    //   <button onClick={() => {setPosition(getRandomNumber())}}>Random Animate</button>

    //   <div ref={container}>
    //     <CompFirst />
    //   </div>
    //   <div>
    //     <CompSecond />
    //   </div>
    // </div>
    <div>
      {/* <div className='box' id='box1'></div>
      <div className='box' id='box2'></div>
      <div className='box' id='box3'></div> */}

      {/* <header>
        <div className='logo'>
          Saylani
        </div>
        <nav>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Gallery</li>
            <li>Contact</li>
          </ul>
        </nav>
      </header> */}
      <Example />

      {/* <h1>HTML</h1>
      <h1>CSS</h1>
      <h1>JAVASCRIPT</h1>
      <h1>REACT</h1> */}
      
    </div>
  );
}

export default App;
