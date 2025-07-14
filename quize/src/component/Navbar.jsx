import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigator = useNavigate()
    const [show,setshow] = useState(false)
    const token = localStorage.getItem("token")
    const showpath = window.location.pathname !== "/"
    const [isLogin,setisLogin] = useState(token?true:false)


    const signup =()=>{
        navigator("/signup")
    }

    const login =()=>{
        navigator("/login")
    }

    const logout = ()=>{
        // const checklogout = window.confirm("Are you sure you want to logout?")
    
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            navigator("/")
            window.location.reload()
            
        
    }

    return (
        <>
            <div className='bg-transparent h-[100px]  flex justify-between items-center'>

                <div className='authName ml-[50px] flex justify-evenly items-center h-full w-32 '>
                    <div className="verticalBar flex justify-between items-center w-fit gap-1">
                        <div className='h-9 w-1 bg-blue-400 -skew-x-[19deg]'  ></div>
                        <div className='bar2 h-9 w-2 bg-blue-500 -skew-x-[19deg]'></div>
                        <div className='bar3 h-9 w-3 bg-blue-600 -skew-x-[19deg]'></div>
                    </div>
                    <h1 className='font-bold text-[25px] font-serif'>
                        quize
                    </h1>
                </div>
               { showpath && <button onClick={()=>navigator("/")} className='p-2 border  bg-gradient-to-bl from-slate-300 to-slate-500 rounded-lg px-3 text-[20px] cursor-pointer '>Go To Home</button>}
                <div className='login mr-[50px] space-x-4 w-fit'>
                   {!isLogin? (<><button onClick={()=>login()}  className='p-2 border rounded-lg px-3 text-[20px] cursor-pointer '>Login</button>
                    <button onClick={()=>signup()} className='p-2 border rounded-lg px-3 text-[20px] cursor-pointer '>Register</button></>):(<> <button onClick={()=>logout()} className='p-2 border rounded-lg px-3 text-[20px] cursor-pointer '>Logout</button></>)}
                </div>

            </div>
        </>
    )
}

export default Navbar
