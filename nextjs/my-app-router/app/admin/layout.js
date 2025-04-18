import AdminHeader from '@/component/admin-header'
import AdminSidebar from '@/component/admin-sidebar'
import React from 'react'

const Layout = ({ children }) => {
  return (
    <div>
      <AdminHeader />
      <div className='flex'>
        <AdminSidebar />
        { children }
      </div>
    </div>
  )
}

export default Layout