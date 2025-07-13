import React, { useState } from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

export default function Entry() {
 const path = window.location.pathname !== "/"
 const [checkpath,setcheckpath] = useState(path)
  return (
    <div className='h-screen  bg-gradient-to-br from-slate-400 via-slate-300 to-slate-300'>
      <Navbar checkpath={checkpath} />
      <Outlet/>

    </div>
  )
}
