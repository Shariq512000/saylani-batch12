import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const AnotherRoute = () => {
  return (
    <div>
        <Head>
            <title>Another Route</title>
        </Head>
        AnotherRoute
        <br />
        <Link href={"/new-route"}>Go to new route</Link>
    </div>
  )
}

export default AnotherRoute