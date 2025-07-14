import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify"
export default function Login() {
  const navigator = useNavigate()
  const [userdata, setuserdata] = useState({})
  const [checkemail, setcheckemai] = useState(false)

  const onchangedata = (e) => {

    const val = e.target.value
    setuserdata(prev => ({ ...prev, [e.target.name]: val }))
  }


  const onformsubmit = async (e) => {
    const { email, password } = userdata
    e.preventDefault()
    try {

      const { data } = await axios.post("https://backenddeployquize.onrender.com/login", { email, password })
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      navigator("/athunticationComplet")
      window.location.reload()
     


    } catch (error) {
      toast.error("Something Wrong")
      console.log(error)
    }
  }


  return (
    <>
      <div className='h-screen flex justify-center items-center'>
        <div className='bg-slate-800 rounded-lg  px-[20px] text-center h-fit w-fit mb-[100px] py-4 '>
          <div>
            <h1 className='text-white font-bold text-[40px]'>
              Login
            </h1>
            <ToastContainer
              position="top-center"
              autoClose={2000}         // 2 seconds
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover={false}
              theme="dark"
            />
            <p className='text-slate-400'>Login to your account☺️</p>
          </div>
          <div className='inputtage  flex justify-center items-center flex-col gap-2'>

            {/* <div className='relative'><span className='absolute top-[30%] left-2'>👨🏼</span><input className='w-[350px] text-white text-[15px] font-serif   bg-slate-500 border-none outline-none py-1 px-8  rounded-lg mt-2 h-[50px] ' placeholder=' Full Name'  type="text" /></div> */}
            <form action="" onSubmit={(e) => onformsubmit(e)}>
              <div className='relative'><span className='absolute top-[30%] left-2'>📩</span><input name='email' onChange={(e) => onchangedata(e)} type='email' className='w-[350px] text-white text-[15px] font-serif   bg-slate-500 border-none outline-none py-1 px-8  rounded-lg mt-2 h-[50px] ' placeholder=' Email id' /></div>
              <div className='relative'><span className='absolute top-[30%] left-2'>🔒</span><input onChange={(e) => onchangedata(e)} name='password' type='password' className='w-[350px] text-white text-[15px] font-serif   bg-slate-500 border-none outline-none py-1 px-8  rounded-lg mt-2 h-[50px] ' placeholder=' Password' /></div>

              <p className='text-blue-600 text-left mt-2 cursor-pointer'>Forget password?</p>
              <button type='submit' className='w-full text-white font-semibold cursor-pointer bg-gradient-to-r from-blue-400 to-blue-700 py-2 mt-2 rounded-lg'>Login</button>
              <p className='text-slate-500 mt-2'>Don't have an account? <span onClick={() => navigator("/signup")} className='text-blue-600 text-left mt-2 cursor-pointer'>Sign Up</span></p>
            </form>
          </div>

        </div>

      </div>
    </>
  )
}

