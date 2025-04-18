import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div>
      Admin Dashboard
      <br />
      <Link href="/admin/sell">Go To Sell</Link>
    </div>
  )
}

export default Page