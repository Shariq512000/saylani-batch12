import UserHeader from '@/component/user-header'
import UserSidebar from '@/component/user-sidebar'
import React from 'react'

const Layout = ({ children }) => {
  return (
    <div>
      <UserHeader />
      <div className='flex'>
        <UserSidebar />
        { children }
      </div>
    </div>
  )
}

export default Layout