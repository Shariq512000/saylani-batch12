import { useGSAP } from '@gsap/react';
import React from 'react';
import gsap from 'gsap';

const Example = () => {
    useGSAP(() => {
        gsap.from("#sec1 h1" , {
            scale: 3,
            duration: 1.5,
            delay: 1,
            opacity: 0
        })
        gsap.from("#sec2 h1" , {
            scale: 3,
            duration: 1.5,
            delay: 1.5,
            opacity: 0,
        })
    })
  return (
    <>
        <section id='sec1'>
            <h1>Section 1</h1>
        </section>

        <section id='sec2'>
            <h1>Section 2</h1>
        </section>

        <section id='sec3'>
            <h1>Section 3</h1>
        </section>
    </>
  )
}

export default Example;