import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NewRoute = () => {
  return (
    <div>
        <Head>
            <title>NewRoute</title>
        </Head>
        NewRoute
        Hello World
        Abc
        <br />
        <Link href={"/new-folder/another-route"}>Go To Other Page</Link>
        <div onClick={() => {console.log("Hello World")}}>Click Me</div>
        <Image width={50} height={50} src={"/vercel.svg"} />
    </div>
  )
}

export default NewRoute