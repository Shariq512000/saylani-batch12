'use client';
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div>
      Admin Dashboard
      <br />

      <div className='' onClick={() => {console.log("first")}}>Click Me</div>

      <br />
      <Link href="/user/orders">Go To Orders</Link>
    </div>
  )
}

export default Page