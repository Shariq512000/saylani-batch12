import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import gsap from 'gsap';

function BasicScroll() {

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.from("#page1 .box", {
      rotate: 360,
      scale: 0.3,
      opacity: 0,
      delay: 1,
      duration: 2,
      repeat: -1,
      yoyo: true
    })

    gsap.from("#page2 .box", {
      // rotate: 360,
      // scale: 0.3,
      opacity: 0,
      // duration: 2,
      x: -1000,
      scrollTrigger: {
        trigger: "#page2 .box",
        markers: true,
        start: "top 48%",
        end: "top 25%",
        scrub: 2
      }
    })
  })

  return (
    <div className="App">
      <div className="pages" id='page1'>
        <div className="box"></div>
      </div>
      <div className="pages" id='page2'>
        <div className="box"></div>
      </div>
      <div className="pages" id='page3'>
        <div className="box"></div>
      </div>
    </div>
  );
}

export default BasicScroll;
