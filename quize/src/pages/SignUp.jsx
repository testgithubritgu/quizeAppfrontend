import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
export default function SignUp() {
  const navigator = useNavigate()
  const [userdata, setuserdata] = useState({})
  const [isuserexist,setisuserxist] = useState(false)
  const ondatachange = (e) => {
    const val = e.target.value
 
    setuserdata(pre => ({...pre, [e.target.name]: val }))
    setisuserxist(false)
  }

  const onformsubmite = async (e) => {
    const { name, email, password } = userdata
   
    e.preventDefault()
    try {
    
    const {data} = await axios.post("https://backenddeployquize.onrender.com/signup",{name,email,password})
  
    setisuserxist(false)
    localStorage.setItem("token",data.token)
    localStorage.setItem("user",JSON.stringify(data.user))
    navigator("/athunticationComplet")
    

    } catch (error) {
      console.log(error)
    setisuserxist(true)
    }
  }
  return (
    <>
      <div className='h-screen flex justify-center items-center '>
       
        <div className='bg-slate-800 rounded-lg  px-[20px] text-center h-fit w-fit mb-[100px] py-4 '>
          <div>
            <h1 className='text-white font-bold text-[40px]'>
              Create Account 
            </h1>
            <p className='text-slate-400'>Create your account</p>
          </div>
          <div className='inputtage  flex justify-center items-center flex-col gap-2'>
            <form action="" onSubmit={(e) => onformsubmite(e)}>
              <div className='relative'><span className='absolute top-[30%] left-2'>👨🏼</span><input name='name' onChange={(e) => ondatachange(e)} className='w-[350px] text-white text-[15px] font-serif   bg-slate-500 border-none outline-none py-1 px-8  rounded-lg mt-2 h-[50px] ' placeholder=' Full Name' type="text" /></div>
              <div className='relative'><span className='absolute top-[30%] left-2'>📩</span><input name='email' onChange={(e) => ondatachange(e)} className='w-[350px] text-white text-[15px] font-serif   bg-slate-500 border-none outline-none py-1 px-8  rounded-lg mt-2 h-[50px] ' placeholder=' Email id' type="email" /></div>
             {isuserexist && <p className='text-white text-left'>email already taken</p>}
              <div className='relative'><span className='absolute top-[30%] left-2'>🔒</span><input name='password' onChange={(e) => ondatachange(e)} className='w-[350px] text-white text-[15px] font-serif   bg-slate-500 border-none outline-none py-1 px-8  rounded-lg mt-2 h-[50px] ' placeholder=' Password' type="password" /></div>
              <p className='text-blue-600 text-left mt-2 cursor-pointer'>Forget password?</p>
              <button type='submit' className='w-full text-white font-semibold cursor-pointer bg-gradient-to-r from-blue-400 to-blue-700 py-2 mt-2 rounded-lg'>Sign Up</button>
            </form>

          </div>

          <p className='text-slate-500 mt-2'>Already have an account? <span onClick={() => navigator("/login")} className='text-blue-600 text-left mt-2 cursor-pointer'>Login here</span></p>
        </div>

      </div>
    </>
  )
}
