import logo from './logo.svg';
import './App.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef, useState } from 'react';
import CompFirst from './component/Comp1';
import CompSecond from './component/Comp2';

function App() {

  gsap.registerPlugin(useGSAP);
  const container = useRef();

  const [position , setPosition] = useState(0)

  // console.log("container" , container.current)

  useGSAP(() => {
    console.log("position" , position)
    gsap.to('.box', { x: position, delay: 1, duration: 2 });
  },{scope: container, dependencies: [position], revertOnUpdate: false});

  const getRandomNumber = () => {
    let randomNumber = Math.random();
    let newRandom = randomNumber * 800;
    return Math.floor(newRandom);
  }

  return (
    <div className="App">
      {/* <input type='text' onChange={(e) => {setPosition(e.target.value)}} />
      <button>Done</button> */}

      <button onClick={() => {setPosition(getRandomNumber())}}>Random Animate</button>

      <div ref={container}>
        <CompFirst />
      </div>
      <div>
        <CompSecond />
      </div>
    </div>
  );
}

export default App;
