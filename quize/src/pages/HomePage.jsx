import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import roboto from "../assets/images/robot.jpg"
const HomePage = () => {
  const navigator = useNavigate()
  const token = localStorage.getItem("user")
  const [checkuser,setcheckuser] = useState(token?true:false)
  const getquze = ()=>{
    !checkuser? navigator("/errorPage"):navigator("/quiz")
  }
  useEffect(()=>{
    setcheckuser(token?true:false)
  })
  return (
    <>
    <div className='h-full text-center  flex justify-center items-center '>
       <div className='h-fit place-items-center w-fit p-5  '>
             <div className='w-[100px] h-[100px]  '>
                  <img src="/images/robot.jpg" width="100px" height="100px"  className='border rounded-full' alt="" />
             </div>
             <br />
             <br />
             <h1 className='font-semibold text-[25px]'>Hey {checkuser?JSON.parse(token).name:"Devloper"}! &#128075;</h1>

             <h1 className='font-bold text-[40px] font-serif '>
              Welcome to our Quiz App
             </h1>
             <p className='font-medium'>
              join us on an amazing quiz tour of our website!
             </p>
             <br />

             <button onClick={()=>getquze()}  className='border  bg-gradient-to-r from-slate-300 to-slate-400  py-2 px-8 rounded-xl cursor-pointer font-semibold hover:scale-105 transition-all duration-200  '>Get started</button>
          </div>
    </div>
    </>
  )
}

export default HomePage
