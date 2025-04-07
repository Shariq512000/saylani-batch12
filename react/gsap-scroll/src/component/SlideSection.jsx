import { useGSAP } from '@gsap/react';
import React from 'react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import gsap from 'gsap';

const SlideSection = () => {

    gsap.registerPlugin(ScrollTrigger)

    useGSAP(() => {
        gsap.to("#page2 h1", {
            xPercent: -60,
            scrollTrigger:{
                trigger: "#page2",
                markers: true,
                scrub: true,
                pin: true
            }
        })

        gsap.from("#page3 h3", {
            x: -500,
            opacity: 0,
            scrollTrigger:{
                trigger: "#page3 h3",
                markers: true,
                scrub: 2,
                start: "top 50%",
                end: "top 40%"
            }
        })

        gsap.from("#page3 h4", {
            x: 500,
            opacity: 0,
            scrollTrigger:{
                trigger: "#page3 h3",
                markers: true,
                scrub: 2,
                start: "top 50%",
                end: "top 40%"
            }
        })
    })

  return (
    <div>
        <div className="pages" id='page1'>
        </div>
        <div className="pages" id='page2'>
            {/* <div className="box"></div> */}
            <h1>Expertise</h1>
        </div>
        <div className="pages" id='page3'>
            <h3>Welcome</h3>
            <h4>Hello World</h4>
        </div>

        <div className="pages" id='page1'>
        </div>
    </div>
  )
}

export default SlideSection